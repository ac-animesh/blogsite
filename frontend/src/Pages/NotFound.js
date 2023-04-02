import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
const NotFound = () => {
  return (
    <div className="p-8 bg-gray-900 flex flex-col justify-center items-center h-screen">
      <div className="">
        <form className="">
          {/* heading */}
          <div className="mb-2 flex flex-row justify-center items-center">
            <DoNotDisturbAltOutlinedIcon
              style={{
                fontSize: "8rem",
                color: "Red",
              }}
            />
            <h2 className="ml-4 text-white font-bold text-6xl">
              404 Not Found
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotFound;
