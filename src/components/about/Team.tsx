import { useState, useEffect } from "react";
import ceo from "../../assets/ceo.png"
export default function LeadershipMessage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white rounded-xl  overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* CEO Photo */}
              <div className="md:col-span-1 bg-white flex items-center justify-center p-8">
                <img src={ceo} alt="" />
              </div>
              
              {/* Message Content */}
              <div className="md:col-span-2 p- md:p-12">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Message from Our CEO</h2>
                  <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                </div>

                <div className="prose prose-lg text-gray-600 space-y-4">
                  <p>
                    As the CEO of our company, I'm proud to lead a team dedicated to excellence in engineering, 
                    construction, and logistics solutions. Our commitment to quality and innovation has been the 
                    cornerstone of our success since our founding.
                  </p>

                  <p>
                    We understand that our clients expect the highest standards in every project. That's why we 
                    invest in cutting-edge technology, skilled professionals, and rigorous quality control 
                    processes to deliver outstanding results.
                  </p>

                  <p>
                    Our vision extends beyond completing projects - we aim to build lasting relationships and 
                    contribute to the sustainable development of our communities. Every day, our team works 
                    tirelessly to uphold our values of integrity, professionalism, and client satisfaction.
                  </p>

                  <p>
                    I invite you to explore how we can work together to bring your next project to life with 
                    the expertise and dedication that defines our company.
                  </p>
                </div>

                <div className="mt-12 pt-6 border-t border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                      <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">CE</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Chief Executive Officer</p>
                      <p className="text-sm text-blue-600">Shah Engineering</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}