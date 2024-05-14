document.getElementById('expense-form').addEventListener('submit', addExpense);

let totalAmount = 0;

async function addExpense(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description && amount) {
        // Send data to the backend server
        const response = await fetch('/add-expense', {
            method: 'POST', // We are sending a POST request
            headers: {
                'Content-Type': 'application/json', // We are sending JSON data
            },
            body: JSON.stringify({ description, amount }), // Convert the data to a JSON string
        });

        if (response.ok) { // If the server responds with a status of 200-299
            const expenseList = document.getElementById('expense-list');
            const expenseItem = document.createElement('li');
            expenseItem.textContent = `${description}: $${amount.toFixed(2)}`;
            expenseList.appendChild(expenseItem);

            totalAmount += amount;
            document.getElementById('total-amount').textContent = totalAmount.toFixed(2);

            document.getElementById('description').value = '';
            document.getElementById('amount').value = '';
        } else {
            console.error('Failed to add expense'); // Log an error if the request fails
        }
    }
}
