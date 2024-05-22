import React from "react";
import { useGlobalData } from "../../hooks/useGlobalData";
import ProjectCard from "../../components/project list/ProjectCard";

export default function Portfolios() {
  const { ourProjects } = useGlobalData();
  return (
    // our portfolios
    <section className="portfolios">
      <div className="container">
        <h1 className="title-box">
          <span className="text-g-primary font-[inherit]">نمونه کارهای</span>{" "}
          ما!
        </h1>

        {/* wrapper portfolios */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {ourProjects.map((pr) => (
            <ProjectCard key={pr.id} {...pr} />
          ))}
        </div>``
      </div>
    </section>
  );
}
