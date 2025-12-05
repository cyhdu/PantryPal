export default function PersonalInfo() {
  return (
    <section className="mb-8">
      <h2 className="text-sm font-semibold text-[#39712e] mb-3">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl text-sm">
        <div>
          <p className="text-xs text-gray-500 mb-1">Name</p>
          <input
            className="w-full h-9 rounded-lg border border-[#e2e2e2] px-3 text-sm bg-white"
            defaultValue=""
          />
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Email</p>
          <input
            className="w-full h-9 rounded-lg border border-[#e2e2e2] px-3 text-sm bg-white"
            defaultValue=""
          />
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Mobile Number</p>
          <input
            className="w-full h-9 rounded-lg border border-[#e2e2e2] px-3 text-sm bg-white"
            defaultValue=""
          />
        </div>
      </div>
    </section>
  );
}
