import React from 'react'
import TopNavigation from './TopNavigation'


function About() {
  
  return (
   
    <div>
         <TopNavigation/>
        <h1>About</h1>
        <p>This is a Mern (MongoDB,Express,react,Node js)stack application with authentication.It allows users to signup,log in,and logout,and provides access to protected routes only for authenticated users.The front-end of the application is built with React and uses React Router for client-side routing.The back-end is built with Node.js and Express,and uses MongoDB as the database.Authentication is  implemented using JSON Web Tokens(JWT).</p><br>
        </br>
        This application is inherited as a starting point for building full-stack applications with authentication using the MERN Stack.On the front-end,React.js offers a reactive UI,where components dynamically respond to user inputs or changes in application state.Redux,combined with Redux-thunk,enhances state management across the react application.Overall, a MERN authentication app with Redux and Redux-Thunk offers a powerful, scalable solution for handling user authentication. It delivers a smooth user experience while maintaining high security standards, thanks to its well-architected backend and efficient state management on the frontend.
        
        </div>
  )
}

export default About