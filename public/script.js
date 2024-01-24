// // public/script.js
// document.addEventListener('DOMContentLoaded', () => {
//     const outputDiv = document.getElementById('output');
//     const table = document.createElement('table');
//     table.innerHTML = `
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Title</th>
//           <th>Completed</th>
//         </tr>
//       </thead>
//       <tbody id="tableBody"></tbody>
//     `;
//     // outputDiv.appendChild(table);
//     const tableBody = document.getElementById('tableBody');
  
//     // Function to fetch and display items
//     const fetchItems = async () => {
//       try {
//         const response = await fetch('/items');
//         const items = await response.json();
  
//         // Clear previous content
//         tableBody.innerHTML = '';
  
//         // Display items in a table
//         items.forEach(item => {
//           const row = tableBody.insertRow();
//           row.innerHTML = `
//             <td>${item.id}</td>
//             <td>${item.title}</td>
//             <td>${item.completed ? 'Yes' : 'No'}</td>
//           `;
//         });
//       } catch (error) {
//         console.error('Error fetching items:', error.message);
//       }
//     };
  
//     // Fetch items on page load
//     fetchItems();
  
//     // Event listener for the "Fetch Items" button
//     // document.getElementById('fetchItemsBtn').addEventListener('click', fetchItems);
//   });
  

// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.getElementById('output');
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="tableBody"></tbody>
    `;
    outputDiv.appendChild(table);
    const tableBody = document.getElementById('tableBody');
  
    // Function to create buttons
    const createButton = (text, onClick) => {
      const button = document.createElement('button');
      button.textContent = text;
      button.addEventListener('click', onClick);
      return button;
    };
  
    // Function to fetch and display items
    const fetchItems = async () => {
      try {
        const response = await fetch('/items');
        const items = await response.json();
  
        // Clear previous content
        tableBody.innerHTML = '';
  
        // Display items in a table
        items.forEach(item => {
          const row = tableBody.insertRow();
  
          // Columns
          const idCell = row.insertCell(0);
          idCell.textContent = item.id;
  
          const titleCell = row.insertCell(1);
          titleCell.textContent = item.title;
  
          const completedCell = row.insertCell(2);
          completedCell.textContent = item.completed ? 'Yes' : 'No';
  
          // Action buttons
          const actionCell = row.insertCell(3);
          actionCell.appendChild(createButton('Update', () => handleUpdate(item.id)));
          actionCell.appendChild(createButton('Delete', () => handleDelete(item.id)));
        });
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };
  
    // Fetch items on page load
    fetchItems();
  
    // Event listener for the "Fetch Items" button
    // document.getElementById('fetchItemsBtn').addEventListener('click', fetchItems);
  
    // Example update and delete handlers
    const handleUpdate = async (itemId) => {
        const response = await fetch(`/items/${itemId}`);
        const itemToUpdate = await response.json();
      
        // Prompt user for updated values (you can use a form or any other UI)
        const updatedTitle = prompt(`Enter updated title for item ${itemId}:`, itemToUpdate.title);
      
        const updatedItem = {
          title: updatedTitle,
          completed: itemToUpdate.completed,
        };
      
        // Send a PUT request to update the item
        await fetch(`/items/${itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedItem),
        });
      
        // Fetch and display updated items
        fetchItems();
      };
      
      const handleDelete = async (itemId) => {
        const confirmDelete = confirm(`Are you sure you want to delete item ${itemId}?`);
      
        if (confirmDelete) {
          // Send a DELETE request to delete the item
          await fetch(`/items/${itemId}`, {
            method: 'DELETE',
          });
      
          // Fetch and display updated items
          fetchItems();
        }
      };
  });
  