import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import QuickSearchItem from "./QuickSearchItem";

const Quicksearch = ({ mealtypeData }) => {
    return (
        <div className="bg-light">
            <section id="section" className="bg-light mb-4">
                <div className="container">
                    <h1 id="container-title" className="text-center">Quick Searches</h1>
                    <h6 id="container-subtitle" className="text-secondary text-center">Discover restaurants by type of meal</h6>
                </div>
                <div className="row g-4">
                    {mealtypeData.map((item) => (
                        <QuickSearchItem key={item.id} data={item} />
                    ))}
                </div>
            </section>
        </div>
    );
};

// Optional: Define default props for function-based components
Quicksearch.defaultProps = {
    mealtypeData: [],
};

// Optional: Define prop types for function-based components
Quicksearch.propTypes = {
    mealtypeData: PropTypes.array.isRequired,
};

export default Quicksearch;

// import React from "react";
// import PropTypes from 'prop-types'; // Import PropTypes
// import QuickSearchItem from "./QuickSearchItem";

// class Quicksearch extends React.Component {
//     render() {
//         const { mealtypeData } = this.props;
//         return (
//             <div className="bg-light">
//                 <section id="section" className="bg-light mb-4">
//                     <div className="container">
//                         <h1 id="container-title" className="text-center">Quick Searches</h1>
//                         <h6 id="container-subtitle" className="text-secondary text-center">Discover restaurants by type of meal</h6>
//                     </div>
//                     <div className="row g-4">
//                         {
//                             mealtypeData.map((item) => (
//                                 <QuickSearchItem key={item.id} data={item} />
//                             ))
//                         }
//                     </div>
//                 </section>
//             </div>
//         );
//     }
// }

// // Optional: Define default props
// Quicksearch.defaultProps = {
//     mealtypeData: [],
// };

// // Optional: Define prop types
// Quicksearch.propTypes = {
//     mealtypeData: PropTypes.array.isRequired,
// };

// export default Quicksearch;
