
export const LoadingSpinner = ({loading}) => {
  if(!loading) return
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        <div className="w-20 h-20 border-emerald-200 border-2 rounded-full" />
        <div className="w-20 h-20 border-emerald-500 border-t-2 animate-spin rounded-full absolute left-0 top-0" />
        <div className="text-emerald-500  text-2xl mt-10">Loading...</div>
      </div>
    </div>
  );
}

export default LoadingSpinner