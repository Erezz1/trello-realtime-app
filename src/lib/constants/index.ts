export const SESSION_COOKIE = "session";
export const SUPABASE_URL = "https://pjtlaxrgpmmbqvzorilm.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqdGxheHJncG1tYnF2em9yaWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjQzMTQsImV4cCI6MjA1OTU0MDMxNH0.AXKSleMCNnJG9WTrbib2lh9-9BC70japf5I2ERweCDU";

export const SESSION_API_URL = process.env.SESSION_API_URL!;
export const SESSION_ENCRYPTION_KEY = process.env.SESSION_ENCRYPTION_KEY!;

export const ERRORS_MESSAGE = {
  TASK_EXIST: "La tarea ya existe",
  COLUM_EXIST: "La columna ya existe",
  COLUM_NOT_EXIST: "La columna no existe",
  USER_NOT_EXIST: "El usuario no existe",
  INCORRECT_DATA: "Los datos son incorrectos",
  SERVER_ERROR: "Ocurrio un error",
};
