export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">测试页面</h1>
        <p>如果你能看到这个页面,说明路由工作正常</p>
        <p className="mt-4 text-sm text-gray-600">
          当前时间: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  )
}





