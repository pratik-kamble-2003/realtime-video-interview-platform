import './App.css'
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  return (
    <>

      <h1>Welcome to the app</h1>
      <header>
        <Show when="signed-out">
          <SignInButton mode='modal'/>
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <SignOutButton/>
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App