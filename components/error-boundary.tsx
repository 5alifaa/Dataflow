"use client";

import type { ReactNode } from "react";
import { Component } from "react";
import { RefreshCw, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-rose-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <ShieldAlert className="size-5 text-rose-600" />
              Something went wrong in the data view
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-stone-600">
              The workflow is still safe to continue, but the grid area hit an
              unexpected rendering problem.
            </p>
            <Button onClick={this.handleReset} variant="secondary">
              <RefreshCw className="size-4" />
              Retry view
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
