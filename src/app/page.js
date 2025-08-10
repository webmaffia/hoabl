
import About from "@/components/About";
import Banner from "../components/Banner";

import Manifesto from "@/components/Manifesto";


import Promises from "@/components/Promises";
import Projects from "@/components/Project";
import Newsroom from "@/components/Newsroom";
import Blog from "@/components/Blog";

export default function Home() {
  return (
   <>
       
        <Banner />
      <Manifesto/>
    <Promises/>
    <Projects/>
      <About/>
      <Newsroom/>
    {/* <Blog/> */}
  
  
   </>
    
   
  );
}
