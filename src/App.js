import React from 'react'
import LinkButton from './components/LinkButton'; 
import TextBanner from './components/TextBanner';
import ProfilePic from './components/ProfilePic';

function App() {
  return (
    <div >
      <ProfilePic 
        picture="" 
      />
      <TextBanner 
        title="Omar Adam Husain @omarahusain"
        text="TPM @ AWS | MBA"
      />

      <LinkButton 
        title="FB"
        name="Follow me on Facebook" 
        link="https://facebook.com/OmarAdamHusain"
      />

      <LinkButton 
        title="Twitter"
        name="Follow me on Twitter" 
        link="https://twitter.com/omo"
      />

      <LinkButton 
        title="Insta"
        name="Follow me on Instagram" 
        link="https://instagram.com/OmarAHusain"
      />

      <LinkButton 
        title="LinkedIn"
        name="Follow me on LinkedIn" 
        link="https://linkedin.com/in/OmarAHusain"
      />

      <LinkButton 
        title="GitHub"
        name="Follow me on Github" 
        link="https://github.com/OmarAHusain"
      />

    </div>  
  );
}

export default App;
