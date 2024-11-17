import React, { useState } from "react";

export function CategorySidebar({ categories, onCategorySelect, onAddCategory }: {
    categories: Array<{ id: number; name: string }>;
    onCategorySelect: (id: number) => void;
    onAddCategory: (name: string) => void;
}) {
    const [newCategoryName, setNewCategoryName] = useState("");

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            onAddCategory(newCategoryName.trim());
            setNewCategoryName("");
        }
    };

    return (
        <div className="sidebar bg-gray-200 w-[20%] p-4">
            {categories.map((category) => (
                <button
                    key={category.id}
                    className="block p-2 text-left hover:bg-gray-300"
                    onClick={() => onCategorySelect(category.id)}
                >
                    {category.name}
                </button>
            ))}
            <div className="mt-4">
                <input
                    type="text"
                    className="border p-1 w-full"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="New Category Name"
                />
                <button
                    className="mt-2 bg-blue-500 text-white p-1 rounded"
                    onClick={handleAddCategory}
                >
                    Add Category
                </button>
            </div>
        </div>
    );
}
