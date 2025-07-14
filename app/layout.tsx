import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";

// ----------------------------------------------
"use client"

import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
// ---------------------------------------------

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IoT Readings Data",
  description: "Web Application designed to display and allow user to interact with data collected by autonomous temp/pressure/humidity recording devices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Authenticator>
          {children}
        </Authenticator>
      </body>
    </html>
  );
}
