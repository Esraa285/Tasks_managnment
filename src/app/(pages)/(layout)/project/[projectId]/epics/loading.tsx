export default function Loading() {




  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-pulse">
   
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-3">
      
          <div className="h-4 w-40 bg-gray-200 rounded-md"></div>
        
          <div className="h-9 w-64 bg-gray-200 rounded-lg"></div>
  
          <div className="h-4 w-96 bg-gray-100 rounded-md hidden sm:block"></div>
        </div>


        <div className="flex gap-3">
          <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
        </div>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-5"
          >

            <div className="flex justify-between items-center">
 \
              <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
       
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>

            <div className="h-7 w-3/4 bg-gray-200 rounded-lg"></div>

         
            <div className="grid grid-cols-3 gap-4 pt-1">
              <div className="space-y-2">
                <div className="h-3 w-10 bg-gray-100 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-12 bg-gray-100 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-10 bg-gray-100 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>

  
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gray-200 rounded-full"></div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}