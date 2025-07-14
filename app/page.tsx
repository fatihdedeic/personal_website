"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

// Login Functionality
import { useAuthenticator } from "@aws-amplify/ui-react"; 


Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {

    const { signOut } = useAuthenticator();
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    function listTodos() {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
    }

    useEffect(() => {
        listTodos();
    }, []);

    function createTodo() {
        client.models.Todo.create({
            content: window.prompt("Weather Today"),
        });
    }


    function deleteTodo(id: string) {
        client.models.Todo.delete({ id })
    }

    return (
        <main>
            <h1>Weather Entries</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {todos.map((todo) => (
                    <li
                        onClick={() => deleteTodo(todo.id)}
                        key={todo.id}>
                        {todo.content}
                    </li>
                ))}
            </ul>
            <div>
                Entries may be deleted by clicking.
                <br />
                <a href="https://www.theweathernetwork.com/en/city/ca/ontario/toronto/current">
                    Compare entries to real weather.
                </a>
            </div>

            // Logout Button
            <button onClick={signOut}>Sign Out</button>
        </main>
    );
}
