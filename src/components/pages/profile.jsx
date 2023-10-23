import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import Account from '../login_auth/account'
import Home from './home'

function Profile() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Home /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}

export default Profile