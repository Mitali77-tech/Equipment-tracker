import React from "react";

function EquipmentList({ equipment, fetchEquipment, setEditItem, search, sortOrder }) {

    const deleteItem = (id) => {
        fetch(`http://localhost:5000/api/equipment/${id}`, {
            method: "DELETE"
        }).then(() => fetchEquipment());
    };

    // search logic
    let filteredEquipment = equipment.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    // sorting logic
    filteredEquipment.sort((a, b) => {
        if (sortOrder === "asc") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Last Cleaned</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredEquipment.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.status}</td>
                        <td>{item.last_cleaned}</td>
                        <td>
                            <button onClick={() => setEditItem(item)}>Edit</button>
                            <button onClick={() => deleteItem(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default EquipmentList;
