import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProfileSummary from "../ProfileSummary";

describe("ProfileSummary Component", () => {
  it("renders highlight cards correctly", () => {
    render(<ProfileSummary />);

    // Assert highlights exist
    expect(screen.getByText("4+ Years")).toBeInTheDocument();
    expect(screen.getByText("Data Security")).toBeInTheDocument();
    expect(screen.getByText("High Performance")).toBeInTheDocument();
  });

  it("renders all skill categories", () => {
    render(<ProfileSummary />);

    // Assert key categories are present
    expect(screen.getByText("Frameworks & State")).toBeInTheDocument();
    expect(screen.getByText("Languages & Styling")).toBeInTheDocument();
    expect(screen.getByText("Security & Cloud")).toBeInTheDocument();
    expect(screen.getByText("Performance & Tools")).toBeInTheDocument();
  });

  it("renders specific skills", () => {
    render(<ProfileSummary />);

    // Assert some specific skills within categories
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Redux Toolkit")).toBeInTheDocument();
    expect(screen.getByText("Core Web Vitals")).toBeInTheDocument();
  });
});
