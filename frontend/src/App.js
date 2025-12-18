import React, { useEffect, useState } from "react";
import "./App.css";
import EquipmentForm from "./components/EquipmentForm";
import EquipmentList from "./components/EquipmentList";

function App() {
    const [equipment, setEquipment] = useState([]);
    const [editItem, setEditItem] = useState(null);

    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const fetchEquipment = () => {
        fetch("http://localhost:5000/api/equipment")
            .then(res => res.json())
            .then(data => setEquipment(data));
    };

    useEffect(() => {
        fetchEquipment();
    }, []);

    return (
        <div className="container">
            <h2>Equipment Tracker</h2>

            {/* search */}
            <input
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* sort */}
            <button onClick={() =>
                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            }>
                Sort by Name ({sortOrder})
            </button>

            <EquipmentForm
                fetchEquipment={fetchEquipment}
                editItem={editItem}
                setEditItem={setEditItem}
            />

            <EquipmentList
                equipment={equipment}
                fetchEquipment={fetchEquipment}
                setEditItem={setEditItem}
                search={search}
                sortOrder={sortOrder}
            />
        </div>
    );
}

export default App;
