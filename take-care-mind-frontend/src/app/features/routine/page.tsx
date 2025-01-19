"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar"; // Assurez-vous que le chemin est correct

const MorningRoutinePage = () => {
  const [activities, setActivities] = useState([
    { id: 1, text: "S'hydrater", completed: false },
    { id: 2, text: "Méditer", completed: false },
    { id: 3, text: "Faire de l'exercice", completed: false },
    { id: 4, text: "Planifier la journée", completed: false },
  ]);

  const handleToggleActivity = (id: number) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const handleSaveReminders = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour sauvegarder les rappels personnalisés
    alert("Rappels sauvegardés !");
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Module de Routine Matinale</h1>
        <p className="mb-6">
          Ce module vous aide à établir une routine matinale personnalisée qui
          favorise le bien-être et la productivité.
        </p>

        <h2 className="text-xl font-semibold mb-2">
          Checklist de Routine Matinale
        </h2>
        <ul className="list-disc ml-6 mb-6">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-center">
              <input
                type="checkbox"
                checked={activity.completed}
                onChange={() => handleToggleActivity(activity.id)}
                className="mr-2"
              />
              <span className={activity.completed ? "line-through" : ""}>
                {activity.text}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Rappels Personnalisés</h2>
        <form onSubmit={handleSaveReminders} className="mb-6">
          <label className="block mb-2">
            Entrez votre rappel (ex. : "Méditer à 7h00") :
            <input
              type="text"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Sauvegarder le Rappel
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">Suivi des Habitudes</h2>
        <p>
          Vous pouvez suivre votre engagement avec votre routine matinale et
          évaluer son impact sur votre bien-être.
        </p>
        {/* Vous pouvez ajouter un graphique ou un tableau ici pour visualiser le suivi des habitudes */}
      </main>
    </div>
  );
};

export default MorningRoutinePage;
