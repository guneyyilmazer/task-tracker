"use client";

import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthPage() {
  const supabase = createClient();
  const [view, setView] = useState<"sign_in" | "sign_up">("sign_in");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Task Tracker</h1>
              <p className="mt-2 text-gray-600">
                {view === "sign_in" 
                  ? "Sign in to manage your tasks" 
                  : "Create an account and start managing tasks instantly"}
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "#000000",
                      brandAccent: "#333333",
                    },
                  },
                },
                style: {
                  button: {
                    borderRadius: "6px",
                  },
                  input: {
                    borderRadius: "6px",
                  },
                },
              }}
              localization={{
                variables: {
                  sign_up: {
                    confirmation_text: "Account created successfully! You can now sign in.",
                    button_label: "Create Account",
                    loading_button_label: "Creating Account...",
                  },
                  sign_in: {
                    button_label: "Sign In",
                    loading_button_label: "Signing in...",
                  },
                },
              }}
              providers={[]}
              redirectTo={`${window.location.origin}/auth/callback`}
              view={view}
              showLinks={false}
            />
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-800 underline"
                onClick={() => setView(view === "sign_in" ? "sign_up" : "sign_in")}
              >
                {view === "sign_in"
                  ? "Don't have an account? Create one now"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
