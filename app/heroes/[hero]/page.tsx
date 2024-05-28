"use client";

import { API } from "@/services/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Abillity from "@/components/abilities/ability";
import {
  IHeroStats,
  IMatchup,
  IHeroAbilities,
  IAbility,
} from "@/services/api/endpoints/types";

const getHero = (heroes: IHeroStats[], name: string) => {
  if (heroes) {
    const hero = heroes.find((hero: IHeroStats) => {
      const heroName = hero.localized_name.replaceAll(" ", "_");

      if (heroName === name) return hero;
    });
    return hero;
  }
};

const heroOverallWinrate = (games: IMatchup[]) => {
  if (games) {
    const gamesPlayed = games.reduce(
      (acc: { games: number; wins: number }, curr: IMatchup) => {
        acc.games += curr.games_played;
        acc.wins += curr.wins;
        return acc;
      },
      { games: 0, wins: 0 }
    );

    return ((gamesPlayed?.wins / gamesPlayed?.games) * 100).toFixed(2);
  }
};

const getHeroAbilities = (
  name: string | undefined,
  heroAbillities: IHeroAbilities[],
  abilities: IAbility[]
) => {
  const newAbilities: IAbility[] = [];
  if (name) {
    const map = new Map(Object.entries(heroAbillities));
    const abilitiesArr = map.get(name);
    abilitiesArr?.abilities.forEach((ability: any) => {
      if (abilities[ability]?.dname.length > 0) {
        newAbilities.push(abilities[ability]);
      }
    });
    return newAbilities;
  } else {
    return [];
  }
};

const HeroPage = () => {
  const [heroStats, setHeroStats] = useState<IHeroStats[]>([]);
  const [heroMatchups, setHeroMatchups] = useState<IMatchup[]>([]);
  const [heroAbillities, setHeroAbilities] = useState<IHeroAbilities[]>([]);
  const [abillities, setAbilities] = useState<IAbility[]>([]);
  const [heroStatsLoading, setHeroStatsLoading] = useState(true);

  const { hero }: { hero: string } = useParams();
  const currentHero = getHero(heroStats, hero);

  useEffect(() => {
    API.heroes
      .getHeroStats()
      .then((data) => {
        setHeroStats(data);
      })
      .catch((error) => {})
      .finally(() => {
        setHeroStatsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentHero) {
      API.heroes
        .getHeroMatchups(currentHero.id)
        .then((data) => setHeroMatchups(data))
        .catch((error) => {});
    }
  }, [currentHero]);

  useEffect(() => {
    API.constants
      .getConstants("hero_abilities")
      .then((data) => setHeroAbilities(data))
      .catch((error) => {});
  }, []);

  useEffect(() => {
    API.constants
      .getConstants("abilities")
      .then((data) => setAbilities(data))
      .catch((error) => {});
  }, []);

  const winrate = heroOverallWinrate(heroMatchups);
  const heroAbilitiesArray = getHeroAbilities(
    currentHero?.name,
    heroAbillities,
    abillities
  );

  return (
    !heroStatsLoading && (
      <section className="h-screen">
        <div className="flex gap-4">
          <div className="w-2/12">
            <Image
              src={`/heroes/${hero
                ?.replaceAll(" ", "_")
                .toLocaleLowerCase()}.png`}
              alt={`${currentHero?.localized_name}`}
              width={256}
              height={144}
            />
          </div>
          <div className="w-10/12 text-lg text-white">
            <h1 className="text-2xl font-bold">
              {currentHero?.localized_name}
            </h1>
            <p></p>
          </div>
          <div
            className={`${
              Number(winrate) < 50 ? "text-red-500" : "text-green-500"
            }`}
          >
            Winrate:{winrate}%
          </div>
        </div>
        <div>
          {heroAbilitiesArray.map((ability: IAbility) => (
            <Abillity key={ability.dname} {...ability} />
          ))}
        </div>
      </section>
    )
  );
};

export default HeroPage;
