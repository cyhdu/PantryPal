const rowClasses =
  "flex items-center justify-between py-3 border-b border-[#f0f0f0] text-sm text-[#333333]";

export default function SecuritySection() {
  return (
    <section className="mb-8">
      <h2 className="text-sm font-semibold text-[#39712e] mb-2">Security</h2>
      <div className="max-w-xl">
        <div className={rowClasses}>
          <span>Change Password</span>
          <span className="text-lg text-gray-400">&gt;</span>
        </div>
        
      </div>
    </section>
  );
}
