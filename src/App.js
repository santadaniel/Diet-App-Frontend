import React , { useState } from 'react';
import './App.css';
import RenderImagesPage from './components/RenderImagesPage'
import ListItems from './components/ListItems'

function App() {
    const [page, setPage] = useState('main');
    const [selectedPlan, setSelectedPlan] = useState('');

    const handleButtonClick = (plan) => {
        setSelectedPlan(plan);
        setPage('diet');
    };

    const handleFoodsClick = () => {
        setPage('foods');
    };

    const handleDrinksClick = () => {
        setPage('drinks');
    };

    const handleBackClick = () => {
        setPage('main');
    }

    const dietPlans = ["healthy", "tasty", "cheap", "expensive"]

    return (
        <div className="App">
            {page === 'main' ? (
                <>
                    <h1 className="App-header">Pick a diet plan based on your likings!</h1>
                    <ul className="list-buttons">
                        {dietPlans.map((plan, index) => (
                            <li className="list-Button1" key={index}>
                                <button className="Diet-Button" onClick={() => handleButtonClick(plan)}>
                                    Show me the {plan} options
                                </button>
                            </li>
                        ))}
                        <li className="list-Button2">
                            <button className="Diet-Button" onClick={handleFoodsClick}>
                                Show me the Foods options
                            </button>
                        </li>
                        <li className="list-Button2">
                            <button className="Diet-Button" onClick={handleDrinksClick}>
                                Show me the Drinks options
                            </button>
                        </li>
                    </ul>
                </>
            ) : page === 'diet' ? (
                <RenderImagesPage
                    url={`http://localhost:8085/diet/${selectedPlan}`}
                    itemsName={selectedPlan}
                    handleBackClick={handleBackClick}
                />
            ) : page === 'foods' ? (
                <ListItems
                    url="http://localhost:8080/foods"
                    itemsName="Foods"
                    handleBackClick={handleBackClick}
                />
            ) : page === 'drinks' ? (
                <ListItems
                    url="http://localhost:8083/drinks"
                    itemsName="Drinks"
                    handleBackClick={handleBackClick}
                />
            ) : null}
        </div>
    );
}

export default App;
