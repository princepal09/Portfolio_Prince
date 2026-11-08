"use client";

import { motion } from "framer-motion";
import { sections } from "@/constants";
import GithubStats from "../GithubStats";

const Github = () => {
  return (
    <section id={sections.github} className="container mx-auto px-5 py-10 sm:px-10 md:py-14">
      <h2 className="mb-8 text-3xl font-bold md:mb-10">
        GitHub <span className="text-primary">Activity</span>
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GithubStats />
      </motion.div>
    </section>
  );
};

export default Github;

