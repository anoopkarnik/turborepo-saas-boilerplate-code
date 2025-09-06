import db from '../index.js';

export async function createCategories() {
  try {
    await db.category.createMany({
      data: [
        { name: "Famous People" },
        { name: "Movies & TV" },
        { name: "Musicians" },
        { name: "Philosophy" },
        { name: "Scientists" }
      ],
      skipDuplicates: true // <- safe to re-run
    });
    console.log('🔥 Default Companion categories created successfully!');
  } catch (error) {
    console.error('Error creating default categories:', error);
    throw error;
  }
  // <-- no disconnect here
}

export async function createFTSIndex() {
  try {
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS companion_fulltext_idx
      ON aicompanion_schema."Companion"
      USING GIN (
        to_tsvector('english', name || ' ' || instructions || ' ' || seed)
      );
    `);

    console.log('🔥 Full-text index created successfully!');
  } catch (err) {
    console.error('🚨 Error creating full-text index:', err);
  } 
}