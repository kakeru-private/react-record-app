import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll';

function AncLink() {
  return (
    <div className='anc'>
        <div className='ancin'>
          
        <ul>
            <p>NAVIGATE</p>
            <ol><AnchorLink href='#top' offset={100}>TOP</AnchorLink></ol>
            <ol><AnchorLink href='#search'offset={100}>SEARCH</AnchorLink></ol>
            <ol><AnchorLink href='#main' offset={100}>LIST</AnchorLink></ol>
            <ol><AnchorLink href='#add' offset={100}>ADD</AnchorLink></ol>
        </ul>
        </div>
    </div>
  )
}

export default AncLink