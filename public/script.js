async function sendRequest() {
    const endpointSelect = document.getElementById('endpoint-select');
    const requestBody = document.getElementById('request-body');
    const responseOutput = document.getElementById('response-output');
    
    const method = endpointSelect.value;
    let url = '/items';
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // For PUT/DELETE, we need an ID
    if (method === 'PUT' || method === 'DELETE') {
        const id = prompt('Enter item ID:');
        if (!id) return;
        url += `/${id}`;
    }

    // Add body for POST/PUT
    if (method === 'POST' || method === 'PUT') {
        try {
            const body = requestBody.value.trim() ? JSON.parse(requestBody.value) : {
                name: 'Sample Item',
                description: 'This is a sample description'
            };
            options.body = JSON.stringify(body);
        } catch (e) {
            alert('Invalid JSON format');
            return;
        }
    }

    try {
        responseOutput.textContent = 'Loading...';
        const response = await fetch(url, options);
        const data = await response.json();
        
        responseOutput.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        responseOutput.textContent = `Error: ${error.message}`;
    }
}

function testEndpoint(method) {
    const endpointSelect = document.getElementById('endpoint-select');
    endpointSelect.value = method;
    
    if (method === 'POST' || method === 'PUT') {
        document.getElementById('request-body').value = method === 'POST' ? 
            `{\n  "name": "New Item",\n  "description": "Item description"\n}` :
            `{\n  "name": "Updated Item",\n  "description": "Updated description"\n}`;
    } else {
        document.getElementById('request-body').value = '';
    }
    
    sendRequest();
}