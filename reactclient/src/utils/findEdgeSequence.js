// Perform DFS traversal starting from the specified node
function dfs(node, visited, executionSequence, adjacencyMap) {
    // Mark the current node as visited
    visited[node] = true;

    // Add the current node to the execution sequence
    executionSequence.push(node);

    // Get the adjacent nodes of the current node from the adjacency map
    const adjacentNodes = adjacencyMap[node] || [];

    // Recursively visit each adjacent node
    for (const adjacentNode of adjacentNodes) {
        if (!visited[adjacentNode]) {
            dfs(adjacentNode, visited, executionSequence, adjacencyMap);
        }
    }
}

// Function to find the execution sequence using DFS
function findExecutionSequence(startNode, adjacencyMap) {
    // Initialize visited map
    const visited = {};

    // Initialize execution sequence
    const executionSequence = [];

    // Perform DFS traversal from the start node
    dfs(startNode, visited, executionSequence, adjacencyMap);

    // Return the execution sequence
    return executionSequence;
}

export function mainDFS(edgeMap){

    // const adjacencyMap = { 'dndnode_0': ['dndnode_1', 'dndnode_2'], 'dndnode_2': ['dndnode_3'] };
    const adjacencyMap = edgeMap
    const startNode = Object.keys(adjacencyMap)[0]
    
    // Find the execution sequence
    const executionSequence = findExecutionSequence(startNode, adjacencyMap);
    
    // Output the execution sequence
    return executionSequence
    
}