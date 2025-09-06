import db from '../index.js';

export async function createAgents() {
  try {
    await db.agents.createMany({
      data: [
        { name: "First Agent", instructions:"Assist users with their queries", userId: "nLz3CjWBIP6f5BE0AGOWzZEfYsPGM3fx"},
      ],
      skipDuplicates: true // <- safe to re-run
    });
    console.log('🔥 Default Agents created successfully!');
  } catch (error) {
    console.error('Error creating default agents:', error);
    throw error;
  }
  // <-- no disconnect here
}