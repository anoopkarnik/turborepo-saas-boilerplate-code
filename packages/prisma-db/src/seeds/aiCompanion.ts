import db from '../index.js';

export async function createCategories(){
    try{
        await db.category.createMany({
            data: [
                {name: "Famous People"},
                {name: "Movies & TV"},
                {name: "Musicians"},
                {name: "Games"},
                {name: "Animals"},
                {name: "Philosophy"},
                {name: "Scientists"}
            ]
        })
    } catch(error){
        console.log('Error creating default categories:', error);
    } finally{
        await db.$disconnect();
    }
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
  } finally {
    await db.$disconnect();
  }
}