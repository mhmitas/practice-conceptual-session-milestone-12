import React, { createContext, useState } from 'react';

export const CategoryContext = createContext(null)

const CategoryProvider = ({ children }) => {
    const [category, setCategory] = useState(null)

    function handleCategoryBox(label) {
        setCategory(label)
    }

    const categoryInfo = {
        category,
        setCategory,
        handleCategoryBox
    }
    return (
        <CategoryContext.Provider value={categoryInfo}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;