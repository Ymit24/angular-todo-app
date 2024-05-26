use std::sync::{Arc, Mutex, RwLock};

use axum::{
    extract::State,
    http::{Method, StatusCode},
    response::IntoResponse,
    routing::{get, on},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer};
use uuid::Uuid;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(root))
        .route("/todo", get(get_todos).post(create_todo))
        .layer(CorsLayer::permissive())
        .with_state(AppState::default());
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn root() -> &'static str {
    "Hello world from axum!"
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Todo {
    id: String,
    name: String,
    status: String,
}

#[derive(Debug, Default, Clone)]
struct AppState {
    todos: Arc<RwLock<Vec<Todo>>>,
}

async fn get_todos(State(state): State<AppState>) -> Json<Vec<Todo>> {
    println!("Todos!");
    let todos = state.todos.read().expect("Failed to get read access");
    Json(todos.clone())
}

async fn create_todo(State(state): State<AppState>, Json(todo): Json<Todo>) -> Json<Todo> {
    let mut todos = state.todos.write().expect("Failed to get write lock");
    let created_todo = Todo {
        id: Uuid::new_v4().to_string(),
        ..todo.clone()
    };
    todos.push(created_todo.clone());
    println!(
        "Creating a todo! New Todo: `{:?}`. Total todos: {:?}",
        todo,
        created_todo.clone()
    );
    Json(created_todo)
}
