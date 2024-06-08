import { Button } from "@/components/ui/button";

const DoubtSection = ({ setDoubt }:any) => {
  return (
    <div className="border border-theme border-[0.2px] min-h-[60vh] min-w-[20vw] bg-white rounded-t-xl shadow-md flex flex-col">
      <div className="flex justify-between items-center px-4 py-3">
        <h1 className="text-lg font-bold">Doubts</h1>
        <Button onClick={() => setDoubt(false)}>Close</Button>
      </div>
      <div className="flex-grow bg-gray-100 px-6 pt-4 rounded-xl  h-full">
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits" // random user image
              alt="user"
              className="h-8 w-8 rounded-full"
            />
            <p className="ml-2">Hello, I have a doubt</p>
          </div>
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits" // random user image
              alt="user"
              className="h-8 w-8 rounded-full"
            />
            <p className="ml-2">Hello, I have a doubt</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubtSection;
