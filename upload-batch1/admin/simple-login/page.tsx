export default function SimpleLoginPage() {
  return (
    <html>
      <head>
        <title>简单登录测试</title>
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7)'
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px'
          }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
              管理后台登录
            </h1>
            <p style={{ color: '#666', marginBottom: '1.5rem', textAlign: 'center' }}>
              请输入您的账号密码登录系统
            </p>
            
            <form action="/admin/dashboard" method="get">
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                  邮箱
                </label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="admin@54like.com"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                  密码
                </label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                登录
              </button>
            </form>
            
            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#666' }}>
              <p>默认管理员账号：admin@54like.com</p>
              <p>默认密码：admin123</p>
              <p style={{ marginTop: '1rem', color: '#999' }}>
                如果这个页面不刷新,说明问题在原登录页面的React组件中
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

