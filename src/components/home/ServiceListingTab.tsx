import { Building2, Construction, Waves, Leaf, Ship, Factory } from 'lucide-react';

const ServiceListingTab = () => {
  const services = [
    {
      id: 1,
      title: 'Buildings',
      icon: Building2,
      description: 'Commercial and residential construction'
    },
    {
      id: 2,
      title: 'Infrastructure',
      icon: Construction,
      description: 'Roads, bridges, and public works'
    },
    {
      id: 3,
      title: 'Sport and Leisure',
      icon: Waves,
      description: 'Sports facilities and recreational centers'
    },
    {
      id: 4,
      title: 'Environment',
      icon: Leaf,
      description: 'Sustainable and eco-friendly projects'
    },
    {
      id: 5,
      title: 'Marine Works',
      icon: Ship,
      description: 'Port facilities and maritime construction'
    },
    {
      id: 6,
      title: 'Industry',
      icon: Factory,
      description: 'Industrial facilities and manufacturing plants'
    },
    {
      id: 7,
      title: 'Transport',
      icon: Factory,
      description: 'Industrial facilities and manufacturing plants'
    }
    ,
    {
      id: 8,
      title: 'Ship management',
      icon: Ship,
      description: 'Port facilities and maritime construction'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Service and Construction</h1>
        <div className="w-16 h-1 bg-red-500 rounded"></div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className="group bg-gradient-to-br from-cyan-300 to-cyan-400 rounded-lg p-8 hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex flex-col items-center text-center h-full">
                {/* Icon Container */}
                <div className="mb-6 p-4 bg-white bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all duration-300">
                  <IconComponent 
                    size={48} 
                    className="text-slate-700 group-hover:text-slate-800 transition-colors duration-300" 
                  />
                </div>
                
                {/* Divider */}
                <div className="w-8 h-0.5 bg-slate-700 mb-4"></div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {service.title}
                </h3>
                
                {/* Description (hidden by default, shown on hover) */}
                <p className="text-sm text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom spacing */}
      <div className="mt-12"></div>
    </div>
  );
};

export default ServiceListingTab;