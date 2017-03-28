/**
 * Created by Kiran Tallapragada on 3/24/2017.
 */
import React from 'react';
export default props =>{
   const NewsList = props.items.map(item=><li className="item" key={item.title}><div className="title">{item.title}</div><div className="image"><img  alt="" src={item.urlToImage}/></div><div className="description">{item.description}</div></li>);
   return (
           <ul className="col-md-4 list-group">
               {NewsList}
           </ul>
   )
}