import React, { useEffect, useState } from "react";

function EquipmentForm({ fetchEquipment, editItem, setEditItem }) {

    const [form, setForm] = useState({
        name: "",
        type: "Machine",
        status: "Active",
        last_cleaned: ""
    });

    useEffect(() => {
        if (editItem) {
            setForm({
                name: editItem.name,
                type: editItem.type,
                status: editItem.status,
                last_cleaned: editItem.last_cleaned
            });
        }
    }, [editItem]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let url = "http://localhost:5000/api/equipment";
        let method = "POST";

        if (editItem) {
            url = `http://localhost:5000/api/equipment/${editItem.id}`;
            method = "PUT";
        }

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }).then(() => {
            fetchEquipment();
            setEditItem(null);
            setForm({
                name: "",
                type: "Machine",
                status: "Active",
                last_cleaned: ""
            });
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{editItem ? "Edit Equipment" : "Add Equipment"}</h3>

            <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
            />

            <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
            >
                <option>Machine</option>
                <option>Vessel</option>
                <option>Tank</option>
                <option>Mixer</option>
            </select>

            <select
                name="status"
                value={form.status}
                onChange={handleChange}
                required
            >
                <option>Active</option>
                <option>Inactive</option>
                <option>Under Maintenance</option>
            </select>

            <input
                type="date"
                name="last_cleaned"
                value={form.last_cleaned}
                onChange={handleChange}
                required
            />

            <button type="submit">Save</button>
        </form>
    );
}

export default EquipmentForm;
