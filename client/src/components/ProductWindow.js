// import React from 'react';
// import { connect } from 'react-redux';



// import './styles/ProductWindow.css';


// class ProductWindow extends React.Component {

//     render() {
//         const currentItem = this.props.itemData[0];
//         const storeData = currentItem.stores.map((item, index) =>
//         <tr key={index}>
//             <th>Store</th>
//             <th>{item.name}</th>
//             <th>{item.inventory}</th>
//         </tr>
//       );

//         return (
//             <div className="product-window">
//                 <div className="item-overview">
//                     <h2>{currentItem.itemName}</h2>
//                     <p>Added by {currentItem.creator}</p>
//                     <img src={currentItem.image}/>
//                 </div>
//                 <div className="item-info">
//                     <table>
//                         <tr>
//                             <th>Price</th>
//                             <th>${currentItem.price}</th>
//                             <th></th>
//                         </tr>
//                         <tr>
//                             <th>UPC Code</th>
//                             <th>{currentItem.upcCode}</th>
//                             <th></th>
//                         </tr>
//                         {storeData}
//                     </table>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = function(state) {
//     return {
//         itemData: state.itemData,
//         loading: state.loading
//     };
// };

// export default connect(mapStateToProps)(ProductWindow);
