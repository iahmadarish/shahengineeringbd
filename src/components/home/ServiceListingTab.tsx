
const ServiceListingTab = () => {
  const services = [
    {
      id: 1,
      title: 'Buildings',
      description: 'Commercial and residential construction',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Infrastructure',
      description: 'Roads, bridges, and public works',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Sport and Leisure',
      description: 'Sports facilities and recreational centers',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Environment',
      description: 'Sustainable and eco-friendly projects',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Marine Works',
      description: 'Port facilities and maritime construction',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Industry',
      description: 'Industrial facilities and manufacturing plants',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 7,
      title: 'Transport',
      description: 'Transportation infrastructure and logistics',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 8,
      title: 'Ship Management',
      description: 'Maritime operations and vessel management',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Service and Construction
        </h1>
        <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105"
          >
            {/* Background Image */}
            <div className="relative h-64 overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300"></div>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {/* Background for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-xl"></div>
              
              <div className="relative z-10">
                {/* Divider */}
                <div className="w-12 h-0.5 bg-blue-400 mb-3 group-hover:w-16 transition-all duration-300"></div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-100 leading-relaxed drop-shadow-sm">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-xl transition-colors duration-300"></div>
          </div>
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="mt-16"></div>
    </div>
  );
};

export default ServiceListingTab;