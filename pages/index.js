import React from "react";
import Head from "next/head";
import Map from "components/map";
import NPC from "components/npc";
import Prize from "components/prize";
import Rock from "components/rock";

import { NPCS, ROCKS, WATER } from "components/constants";
import { flipTiles, generateMap } from "components/utils";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "https://tinymystery.club";

export const MAP_SIZE = 59;

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    const map = generateMap(MAP_SIZE);
    const blockedTiles = [...NPCS, ...WATER];

    blockedTiles.forEach(({ spawn }) => {
      map[spawn.top][spawn.left] = 0;
    });

    let devMode = false;
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      devMode = urlParams.get("devMode");
    }

    this.state = {
      devMode: devMode != null,
      map,
      score: 0,
    };

    this.flipTiles = this.flipTiles.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    const { innerWidth, innerHeight, scrollX, scrollY } = window;

    // This isn't ideal... basically tries to detect if a player was previously
    // scrolled. If not (scrolled to top left), move player to center.
    // This causes a bug where if the user had previously scrolled to the top
    // left, they will be jumped to the middle and back to the top left.
    if (!(scrollX && scrollY)) {
      window.scrollTo(
        (MAP_SIZE * 100 - innerWidth) / 2,
        (MAP_SIZE * 100 - innerHeight) / 2
      );
    }
  }

  flipTiles(blockTiles, clearTiles) {
    this.setState({
      map: flipTiles(blockTiles, clearTiles, this.state.map),
    });
  }

  updateScore() {
    this.setState({ score: this.state.score + 1 });
  }

  render() {
    const { devMode, map, score } = this.state;
    // Ideas...
    // Each char should have a state that's impacted by what they're near, player can trigger things that affect how they're impacted
    // For now, maybe have them change color depending on feelings...
    // Speech bubbles appearing when chars recognize they're near each other
    // Obscure the map and have parts be more visible due to fireflies lighting things as they move around @ night

    // Should go in Redux so that objects can dictate which tiles are blocked

    // Add react-helmet (Next version?)

    return (
      <div style={{ position: "relative" }}>
        <Head>
          <title>
            {`Tiny Mystery ${devMode ? "Sandbox" : "Club"}` +
              (score ? ` (${score})` : "")}
          </title>
          <link rel="stylesheet" type="text/css" href="./static/reset.css" />
          <link rel="icon" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#349E76"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
          <meta property="twitter:title" content="Tiny Mystery Club" />
          <meta property="og:title" content="Tiny Mystery Club" />
          <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="627" />
        </Head>

        {NPCS.map(({ key, spawn, spriteType }) => (
          <NPC
            devMode={devMode}
            flipTiles={this.flipTiles}
            key={key}
            map={map}
            spawn={spawn}
            spriteType={spriteType}
          />
        ))}

        {ROCKS.map(({ spawn }) => (
          <Rock
            flipTiles={this.flipTiles}
            key={`${spawn.top}_${spawn.left}`}
            spawn={spawn}
          />
        ))}

        <a href="/room">
          <Rock flipTiles={this.flipTiles} spawn={{ left: 6, top: 6 }} />
        </a>

        <Prize
          flipTiles={this.flipTiles}
          map={map}
          updateScore={this.updateScore}
        />

        <Map devMode={devMode} map={map} water={WATER} />
      </div>
    );
  }
}

export default App;
