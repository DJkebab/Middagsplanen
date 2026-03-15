import { useState, useEffect, useCallback } from "react";

const RESTAURANTS = [
  {
    id: "copine",
    name: "Copine by Jim&Jacob",
    type: "Sydeuropeiskt",
    area: "Östermalm",
    addr: "Kommendörsgatan 23",
    g: 4.7,
    rev: 380,
    open: "Lör 17–00",
    age: "18+",
    web: "https://www.jimjacobrestauranger.se/copine",
    maps: "https://www.google.com/maps/place/Copine+by+Jim%26Jacob",
    desc: "Systerrestaurang till populära Jim&Jacob. Modern sydeuropeisk meny – piggvar, råbiff, pasta, biff på ben. Snygg lokal med öppet kök. Tre chambre séparéer (12-20 pers) utan extra avgift. Högsta betyget av alla förslag.",
    lo: 480, mid: 650, hi: 700,
    pn: "Verifierad PDF-meny mars 2026. Råbiff 205kr, Anka 375kr, Spagetti 285kr, Dessert 70-145kr.",
    sc: [5, 4.5, 4.5, 4, 5],
  },
  {
    id: "glashuset",
    name: "Glashuset",
    type: "Modernt brasserie",
    area: "Östermalm",
    addr: "Strandvägen, Kajplats 18",
    g: 4.4,
    rev: 2440,
    open: "Lör 11:30–sent",
    age: "18+",
    web: "https://www.glashuset.com",
    maps: "https://www.google.com/maps/place/Glashuset+Restaurang+%26+Bar",
    desc: "K-märkt glasbyggnad från 1955 vid kajkanten på Strandvägen. Fun Dining-koncept med delbara rätter. Sjuk miljö vid vattnet. Stockholms snyggaste restaurangbyggnad.",
    lo: 510, mid: 675, hi: 700,
    pn: "Verifierad webbmeny mars 2026. Hjort 375kr, Ryggbiff 395kr, Burrata 185kr, Dessert 65-125kr.",
    sc: [3.5, 3.5, 5, 4, 4],
  },
  {
    id: "florentine",
    name: "Florentine",
    type: "Italienskt",
    area: "Södermalm",
    addr: "Folkungagatan 44",
    g: 4.4,
    rev: 1748,
    open: "Lör – stänger 22",
    age: "18+",
    web: "https://florentinerestaurants.com",
    maps: "https://www.google.com/maps/place/Florentine+-+Italiensk+Restaurang",
    desc: "Populär italienare på SoFo. Klassisk inredning med läder, trä och varmt ljus. Pasta, kött och fisk. Stor vinlista. Alltid fullbokat – boka tidigt!",
    lo: 350, mid: 550, hi: 680,
    pn: "Uppskattning baserad på Krogguiden ($$$). Ring 08-122 501 59 för exakta priser.",
    sc: [4.5, 4, 4.5, 3.5, 4.5],
  },
  {
    id: "kouzina",
    name: "Kouzina",
    type: "Grekiskt",
    area: "Östermalm",
    addr: "Valhallavägen 131",
    g: 4.5,
    rev: 619,
    open: "Lör 16–00",
    age: "18+",
    web: "https://www.kouzina.se",
    maps: "https://www.google.com/maps/place/Kouzina",
    desc: "Autentisk grekisk restaurang med sydeuropeisk charm. Moussaka, souvlaki, grillad fetaost med honung. Sharing-menyer perfekta för grupper. Alla nämner den sjukt trevliga servicen.",
    lo: 350, mid: 500, hi: 700,
    pn: "TheFork: snitt ca 350kr (förrätt+huvud). RestaurantGuru: 600-700kr med allt. Sharing-menyer för grupp.",
    sc: [4.5, 5, 4, 4, 4.5],
  },
  {
    id: "dersch",
    name: "Dersch",
    type: "Schnitzel",
    area: "Vasastan",
    addr: "Tulegatan 22",
    g: 4.2,
    rev: 405,
    open: "Lör 13–23",
    age: "18+",
    web: "https://dersch.se",
    maps: "https://www.google.com/maps/place/Dersch",
    desc: "Roy Naders (Sveriges Mästerkock) hypade schnitzelrestaurang. Kalv, Iberico eller piggvar-schnitzel med kreativa sides. Elegant lokal med marmor och trä. Alltid fullt – boka i förväg!",
    lo: 400, mid: 550, hi: 700,
    pn: "Verifierat: Wienerschnitzel 325kr, Iberico 495kr, Piggvar 599kr. Sides 45-60kr/st extra. Förrätter från 160kr.",
    sc: [4, 3.5, 4, 4, 3.5],
  },
  {
    id: "sturehof",
    name: "Sturehof",
    type: "Fisk och Skaldjur",
    area: "Östermalm",
    addr: "Stureplan 2",
    g: 4.3,
    rev: 3252,
    open: "Lör – stänger 02",
    age: "18+ (middag)",
    web: "https://sturehof.com",
    maps: "https://www.google.com/maps/place/Sturehof",
    desc: "Stockholms mest ikoniska restaurang sedan 1897. Fisk och skaldjur i fokus – egen fiskebåt! Privata salonger för 12-80 pers. Öppet 365 dagar om året mitt på Stureplan.",
    lo: 350, mid: 600, hi: 700,
    pn: "Sill-assietter ca 200kr, Piggvar ca 350kr. Privata salonger har fasta menyer. Ring 08-440 57 30.",
    sc: [4, 4, 4, 4, 4.5],
  },
  {
    id: "rolfskok",
    name: "Rolfs Kök",
    type: "Klassisk bistro",
    area: "Vasastan",
    addr: "Tegnérgatan 41",
    g: 4.5,
    rev: 2916,
    open: "Lör 17–01",
    age: "18+",
    web: "https://rolfskok.se",
    maps: "https://www.google.com/maps/place/Rolfs+K%C3%B6k",
    desc: "Institution sedan 1989. Öppet kök, legendarisk oxkind (på menyn sedan 2001). Michelin-noterad. 800+ viner. Designad av Jonas Bohlin. Stammisar och foodies. Kan vara trångt för 10.",
    lo: 400, mid: 650, hi: 700,
    pn: "Krogguiden: middag 400-800kr. RestaurantGuru: 700-800kr snitt. Trångt – ring och fråga om plats.",
    sc: [5, 4.5, 4, 3.5, 3.5],
  },
  {
    id: "brisket",
    name: "Brisket and Friends",
    type: "Texas BBQ",
    area: "Vasastan / Söder",
    addr: "Upplandsgatan 7 eller Östgötagatan 25",
    g: 4.1,
    rev: 1200,
    open: "Lör 12–sent",
    age: "18+",
    web: "https://www.brisketandfriends.se",
    maps: "https://www.google.com/maps/place/Brisket+%26+Friends",
    desc: "Äkta Texas BBQ – brisket rökt med hickoryträ från USA. Beställ kött efter vikt + sides på stålbricka. Eget bryggeri (Big Bone Brews). Avslappnad bar-stämning. Alla blir mätta.",
    lo: 325, mid: 550, hi: 650,
    pn: "EXAKTA priser från deras webb. Tablebreaker 325kr, AYCE-buffé 550kr/pers.",
    sc: [4, 3.5, 3.5, 4, 5],
  },
  {
    id: "brillo",
    name: "Taverna Brillo",
    type: "Italienskt brasserie",
    area: "Östermalm",
    addr: "Sturegatan 6",
    g: 4.1,
    rev: 2200,
    open: "Lör 12–sent",
    age: "18+",
    web: "https://tavernabrillo.se",
    maps: "https://www.google.com/maps/place/Taverna+Brillo",
    desc: "Italienskt brasserie vid Stureplan. Samma grupp som Sturehof och Riche. Musik, konst och mat. Pizza, pasta, kött. Avslappnat men ändå Stureplan-känsla.",
    lo: 350, mid: 500, hi: 650,
    pn: "Uppskattning. Pizza/pasta 180-250kr, kött/fisk 280-380kr. Ring för aktuell meny.",
    sc: [3.5, 3.5, 4, 4, 4.5],
  },
  {
    id: "nabo",
    name: "Nabo",
    type: "Nordiskt brasserie",
    area: "Vasastan",
    addr: "Vid Tegnérlunden",
    g: 4.3,
    rev: 800,
    open: "Lör – sent",
    age: "18+",
    web: "https://restaurangnabo.se",
    maps: "https://www.google.com/maps/place/Nabo+Stockholm",
    desc: "Franskt-nordiskt brasserie. Ljus, luftig lokal. Steak frites, risotto, ceviche. Chambre séparée i källaren med rustika stenvalv – plats för 26 pers utan extra kostnad!",
    lo: 300, mid: 450, hi: 600,
    pn: "Uppskattning. Varmrätter 250-350kr. Chambre séparée gratis – ring och boka.",
    sc: [3.5, 4, 4, 3.5, 4.5],
  },
  {
    id: "artilleriet",
    name: "Artilleriet",
    type: "Nordiskt / Cocktailbar",
    area: "Östermalm",
    addr: "Artillerigatan 13",
    g: 4.4,
    rev: 809,
    open: "Lör – sent",
    age: "18+",
    web: "https://restaurangartilleriet.se",
    maps: "https://www.google.com/maps/place/Restaurang+Artilleriet",
    desc: "Dold pärla i vitputsade stenvalv. Kvarterskrog + cocktailbar (Stjärtilleriet) med kreativa drinkar och DJ fredagar. Svensk mat med internationella influenser. Jazz tisdagar.",
    lo: 300, mid: 500, hi: 650,
    pn: "Uppskattning. Middag: förrätt + huvudrätt ca 400-550kr. Gruppmenyer för 12+ finns.",
    sc: [3.5, 4, 4.5, 4.5, 4.5],
  },
  {
    id: "surfers",
    name: "Surfers",
    type: "Kinesiskt / Sharing",
    area: "City",
    addr: "Norrlandsgatan 24",
    g: 4.3,
    rev: 1500,
    open: "Lör – sent",
    age: "18+",
    web: "https://surfersstockholm.se",
    maps: "https://www.google.com/maps/place/Surfers+Stockholm",
    desc: "Kinesiska smårätter från Sichuan att dela – wonton, ankbröst, tofu. Började som surfbar på Gotland. Ung publik, DJ fre-lör. Bra veganalternativ. Perfekt sharing-koncept.",
    lo: 350, mid: 550, hi: 700,
    pn: "Krogguiden ($$). Smårätter ca 100-180kr. 3-4 rätter/pers att dela.",
    sc: [4, 3.5, 4, 4.5, 4],
  },
  {
    id: "sodershjarta",
    name: "Söders Hjärta",
    type: "Svenskt",
    area: "Södermalm",
    addr: "Bellmansgatan 22",
    g: 4.3,
    rev: 894,
    open: "Lör – stänger 01",
    age: "18+",
    web: "https://sodershjarta.se",
    maps: "https://www.google.com/maps/place/S%C3%B6ders+Hj%C3%A4rta",
    desc: "Kultställe! ABBA åt här efter Australien-turnén 1977. Victoria hade möhippa här. Charmig lokal, gästspel av kändisar. Enklare mat men sjukt prisvärt och massa historia.",
    lo: 250, mid: 400, hi: 550,
    pn: "Krogguiden ($$). Varmrätter ca 200-300kr. Billigaste alternativet.",
    sc: [3.5, 4, 4.5, 3.5, 4],
  },
  {
    id: "vaudeville",
    name: "Vau de ville",
    type: "Brasserie / Fusion",
    area: "City",
    addr: "Norrmalmstorg 6",
    g: 4.1,
    rev: 1731,
    open: "Lör – stänger 22",
    age: "18+ (middag)",
    web: "https://vaudevillestockholm.se",
    maps: "https://www.google.com/maps/place/Vau+de+ville",
    desc: "Anrikt ställe på Norrmalmstorg. Klassisk brasserie med modern fusion. Gruppmenyer för 10+ pers gör bokning smidig. Centralt läge mitt i stan.",
    lo: 350, mid: 550, hi: 700,
    pn: "Gruppmenyer för 10+. Ring 08-22 19 34 för pris.",
    sc: [3, 3, 4, 3.5, 3.5],
  },
  {
    id: "hantverket",
    name: "Hantverket",
    type: "Nordiskt",
    area: "Östermalm",
    addr: "Sturegatan 15",
    g: 4.5,
    rev: 1100,
    open: "Lör – sent",
    age: "18+",
    web: "https://restauranghantverket.se",
    maps: "https://www.google.com/maps/place/Restaurang+Hantverket",
    desc: "Nordisk mat med säsongsfokus. Varm, inbjudande lokal. Sjukt trevlig personal. Lagom fint utan att vara stelt – perfekt mellanväg mellan casual och fine dining.",
    lo: 400, mid: 600, hi: 700,
    pn: "Uppskattning. Förrätt ca 180kr, Huvudrätt ca 300-380kr, Dessert ca 130kr.",
    sc: [4.5, 4.5, 4.5, 3.5, 4.5],
  },
];

const REMOVED = [
  { n: "Supper Stockholm", r: "Åldersgräns 23" },
  { n: "Restaurang Tako", r: "25-årsgräns late night fre-lör" },
  { n: "Le Hibou", r: "Primärt bar, inte middag för 10" },
  { n: "Mister French", r: "Lågt betyg (3.8), dyrt, nattklubbsvibe" },
  { n: "Gondolen", r: "Över budget (800-1200kr/pp)" },
  { n: "Zink Italian", r: "För basic, inget wow" },
  { n: "Freyja + Söder", r: "Inte tillräckligt spännande" },
];

const LABELS = ["Mat", "Service", "Miljö", "Vibe", "Allrounder"];
const STORE_VOTES = "dinner-final-votes";
const STORE_SUGGEST = "dinner-final-suggestions";

export default function App() {
  const [votes, setVotes] = useState({});
  const [myVotes, setMyVotes] = useState({});
  const [name, setName] = useState("");
  const [nameSet, setNameSet] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voterNames, setVoterNames] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState("");
  const [showRemoved, setShowRemoved] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const votesData = localStorage.getItem(STORE_VOTES);
      if (votesData) {
        const data = JSON.parse(votesData);
        setVotes(data.votes || {});
        setVoterNames(data.names || {});
      }
    } catch (e) { /* empty */ }
    try {
      const suggestionsData = localStorage.getItem(STORE_SUGGEST);
      if (suggestionsData) {
        setSuggestions(JSON.parse(suggestionsData));
      }
    } catch (e) { /* empty */ }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(loadData, 5000);
      return () => clearInterval(interval);
    }
  }, [loading, loadData]);

  const handleVote = async (id) => {
    if (!nameSet) return;
    const willVote = !myVotes[id];
    const newMyVotes = { ...myVotes, [id]: willVote };
    setMyVotes(newMyVotes);

    const newVotes = { ...votes, [id]: Math.max(0, (votes[id] || 0) + (willVote ? 1 : -1)) };
    setVotes(newVotes);

    const newNames = { ...voterNames };
    if (!newNames[id]) newNames[id] = [];
    if (willVote) {
      if (!newNames[id].includes(name)) newNames[id].push(name);
    } else {
      newNames[id] = newNames[id].filter(n => n !== name);
    }
    setVoterNames(newNames);

    try {
      localStorage.setItem(STORE_VOTES, JSON.stringify({ votes: newVotes, names: newNames }));
    } catch (e) { /* empty */ }
  };

  const handleSuggestion = async () => {
    if (!newSuggestion.trim()) return;
    const updated = [...suggestions, { text: newSuggestion.trim(), by: name }];
    setSuggestions(updated);
    setNewSuggestion("");
    try {
      localStorage.setItem(STORE_SUGGEST, JSON.stringify(updated));
    } catch (e) { /* empty */ }
  };

  if (loading) {
    return (
      <div style={{ background: "#0b0b0b", color: "#666", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" }}>
        Laddar...
      </div>
    );
  }

  if (!nameSet) {
    return (
      <div style={{ background: "#0b0b0b", color: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', system-ui, sans-serif", padding: 20 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Instrument+Serif&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center", maxWidth: 340 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase", marginBottom: 8 }}>
            Lördag kväll - ca 10 pers - Vi är 19
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, fontWeight: 400, margin: "0 0 6px" }}>
            Middagsplanen
          </h1>
          <p style={{ color: "#666", fontSize: 13, marginBottom: 24 }}>
            Pappa bjuder maten (max 700kr/pp, ej dricka). Rösta!
          </p>
          <input
            type="text"
            placeholder="Ditt förnamn..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) setNameSet(true); }}
            style={{ width: "100%", padding: "14px", background: "#111", border: "1px solid #333", borderRadius: 10, color: "#fff", fontSize: 16, outline: "none", boxSizing: "border-box", marginBottom: 12, textAlign: "center" }}
          />
          <button
            onClick={() => { if (name.trim()) setNameSet(true); }}
            style={{ width: "100%", padding: "14px", background: name.trim() ? "#E8A838" : "#222", color: name.trim() ? "#000" : "#555", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: name.trim() ? "pointer" : "default" }}
          >
            Kör igång
          </button>
        </div>
      </div>
    );
  }

  const sorted = [...RESTAURANTS].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));
  const maxVote = Math.max(1, ...RESTAURANTS.map(r => votes[r.id] || 0));
  const allVoters = [...new Set(Object.values(voterNames).flat())];

  return (
    <div style={{ background: "#0b0b0b", color: "#e8e8e8", fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh", padding: "14px 10px 50px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Instrument+Serif&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 540, margin: "0 auto" }}>

        <header style={{ textAlign: "center", padding: "6px 0 12px" }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase" }}>
            Lördag kväll - Max 700kr/pers mat - Vi är 19 - ca 10 pers
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, fontWeight: 400, margin: "4px 0 2px" }}>
            Middagsplanen
          </h1>
          <p style={{ fontSize: 11, color: "#555", margin: 0 }}>
            {"Hej "}
            <span style={{ color: "#E8A838" }}>{name}</span>
            {" – tryck hjärtat för att rösta (flerval ok)"}
          </p>
        </header>

        {/* Dashboard */}
        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, padding: 12, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 9, letterSpacing: 2, color: "#E8A838", textTransform: "uppercase", fontWeight: 700 }}>Live-röstning</span>
            <span style={{ fontSize: 10, color: "#444" }}>{allVoters.length} har röstat</span>
          </div>
          {sorted.map((r, i) => {
            const count = votes[r.id] || 0;
            const isLeader = i === 0 && count > 0;
            const names = voterNames[r.id] || [];
            return (
              <div key={r.id} style={{ marginBottom: 5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: isLeader ? 700 : 400, color: isLeader ? "#fff" : "#777" }}>
                    {isLeader && count > 0 ? "👑 " : ""}{r.name}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: isLeader ? "#E8A838" : "#444" }}>{count}</span>
                </div>
                <div style={{ height: 4, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${(count / maxVote) * 100}%`, height: "100%", borderRadius: 2, background: isLeader ? "linear-gradient(90deg, #E8A838, #FD79A8)" : "#ffffff22", transition: "width 0.3s" }} />
                </div>
                {names.length > 0 && (
                  <div style={{ fontSize: 9, color: "#333", marginTop: 1 }}>{names.join(", ")}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cards */}
        {RESTAURANTS.map((r) => {
          const isOpen = expanded === r.id;
          const voted = myVotes[r.id];
          const count = votes[r.id] || 0;
          const overBudget = r.mid > 700;

          return (
            <div key={r.id} style={{ background: "#111", border: `1px solid ${voted ? "#E8A83844" : "#1a1a1a"}`, borderRadius: 12, marginBottom: 8, overflow: "hidden" }}>
              {/* Header */}
              <div style={{ padding: "11px 12px 9px", cursor: "pointer" }} onClick={() => setExpanded(isOpen ? null : r.id)}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 3, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ fontSize: 8, color: "#666", background: "#ffffff08", padding: "2px 5px", borderRadius: 3 }}>{r.type}</span>
                      <span style={{ fontSize: 8, color: "#666", background: "#ffffff08", padding: "2px 5px", borderRadius: 3 }}>{r.area}</span>
                      <span style={{ fontSize: 8, color: "#4ECDC4", background: "#4ECDC410", padding: "2px 5px", borderRadius: 3 }}>
                        {"🧊 "}{r.age}
                      </span>
                      {overBudget && <span style={{ fontSize: 8, fontWeight: 700, color: "#FD79A8", background: "#FD79A810", padding: "2px 5px", borderRadius: 3 }}>TIGHT</span>}
                    </div>
                    <h2 style={{ margin: "0 0 1px", fontSize: 15, fontWeight: 700, color: "#fff" }}>{r.name}</h2>
                    <div style={{ fontSize: 10, color: "#555" }}>{r.addr} - {r.open}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{r.g}</div>
                    <div style={{ fontSize: 9, color: "#444" }}>{r.rev} rek</div>
                  </div>
                </div>
                <div style={{ marginTop: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: overBudget ? "#FD79A8" : "#E8A838" }}>{r.lo}{"–"}{r.hi} kr/pers</span>
                  <span style={{ fontSize: 10, color: "#444" }}>{isOpen ? "▴ stäng" : "▾ detaljer"}</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", borderTop: "1px solid #151515", background: "#0c0c0c" }}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleVote(r.id); }}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "9px", background: voted ? "#E8A83810" : "transparent", border: "none", color: voted ? "#E8A838" : "#444", fontSize: 12, fontWeight: voted ? 700 : 400, cursor: "pointer" }}
                >
                  <span style={{ fontSize: 15 }}>{voted ? "❤️" : "🤍"}</span>
                  {voted ? `Röstat (${count})` : `Rösta (${count})`}
                </button>
                <div style={{ width: 1, height: 16, background: "#1a1a1a", alignSelf: "center" }} />
                <a href={r.web} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ flex: 0.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, padding: "9px", color: "#444", fontSize: 10, textDecoration: "none" }}>
                  {"🌐 Webb"}
                </a>
                <div style={{ width: 1, height: 16, background: "#1a1a1a", alignSelf: "center" }} />
                <a href={r.maps} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ flex: 0.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, padding: "9px", color: "#444", fontSize: 10, textDecoration: "none" }}>
                  {"📍 Karta"}
                </a>
              </div>

              {/* Expanded */}
              {isOpen && (
                <div style={{ padding: "10px 12px 12px", borderTop: "1px solid #151515" }}>
                  <p style={{ fontSize: 12, color: "#bbb", lineHeight: 1.6, margin: "0 0 10px", padding: "8px 10px", background: "#0d0d0d", borderRadius: 8, borderLeft: "2px solid #E8A83833" }}>
                    {r.desc}
                  </p>
                  <div style={{ marginBottom: 10 }}>
                    {r.sc.map((score, idx) => {
                      const barColors = ["#E8A838", "#6C5CE7", "#4ECDC4", "#FD79A8", "#45B7D1"];
                      return (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <span style={{ width: 56, fontSize: 9, color: "#444", textTransform: "uppercase" }}>{LABELS[idx]}</span>
                        <div style={{ flex: 1, height: 4, background: "#1a1a1a", borderRadius: 2 }}>
                          <div style={{ width: `${(score / 5) * 100}%`, height: "100%", background: barColors[idx], borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 10, color: "#555", width: 20, textAlign: "right" }}>{score}</span>
                      </div>
                      );
                    })}
                  </div>
                  <div style={{ background: "#0a0a0a", borderRadius: 8, padding: 10, marginBottom: 8 }}>
                    <div style={{ fontSize: 9, color: "#333", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Budget per person (mat, ej dricka)</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      {[
                        ["Budget", r.lo, "#4ECDC4"],
                        ["Typiskt", r.mid, "#E8A838"],
                        ["Max", r.hi, "#FD79A8"]
                      ].map(([label, price, color]) => (
                        <div key={label} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 9, color: color, fontWeight: 600 }}>{label}</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: price > 700 ? "#FD79A8" : "#fff" }}>
                            {price}<span style={{ fontSize: 9, color: "#444" }}>kr</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 10, color: "#555", borderTop: "1px solid #151515", paddingTop: 6 }}>{r.pn}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, paddingTop: 6, borderTop: "1px solid #151515" }}>
                      <span style={{ fontSize: 10, color: "#555" }}>10 pers totalt (typiskt)</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: r.mid * 10 <= 7000 ? "#4ECDC4" : "#FD79A8" }}>
                        {(r.mid * 10).toLocaleString()}kr
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Removed */}
        <div style={{ marginTop: 6 }}>
          <button
            onClick={() => setShowRemoved(!showRemoved)}
            style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #1a1a1a", borderRadius: showRemoved ? "10px 10px 0 0" : "10px", color: "#555", fontSize: 11, cursor: "pointer", textAlign: "left" }}
          >
            {showRemoved ? "▴" : "▾"}{" Bortfiltrerade ("}{REMOVED.length}{" st) – åldersgräns, för dyrt, etc"}
          </button>
          {showRemoved && (
            <div style={{ background: "#0d0d0d", borderRadius: "0 0 10px 10px", padding: 10, border: "1px solid #1a1a1a", borderTop: "none" }}>
              {REMOVED.map((item, i) => (
                <div key={i} style={{ padding: "4px 0", borderBottom: i < REMOVED.length - 1 ? "1px solid #141414" : "none" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>{item.n}</span>
                  <div style={{ fontSize: 10, color: "#FD79A8" }}>{item.r}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, padding: 12, marginTop: 12 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: "#6C5CE7", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
            {"Eget förslag – skriv in en restaurang"}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <input
              type="text"
              placeholder="T.ex. AG, Riche..."
              value={newSuggestion}
              onChange={(e) => setNewSuggestion(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSuggestion(); }}
              style={{ flex: 1, padding: "10px", background: "#0a0a0a", border: "1px solid #222", borderRadius: 8, color: "#fff", fontSize: 13, outline: "none" }}
            />
            <button
              onClick={handleSuggestion}
              style={{ padding: "10px 14px", background: newSuggestion.trim() ? "#6C5CE7" : "#222", color: newSuggestion.trim() ? "#fff" : "#444", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: newSuggestion.trim() ? "pointer" : "default", whiteSpace: "nowrap" }}
            >
              Skicka
            </button>
          </div>
          {suggestions.length > 0 && (
            <div style={{ marginTop: 8 }}>
              {suggestions.map((s, i) => (
                <div key={i} style={{ padding: "5px 0", borderTop: "1px solid #151515", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "#ccc" }}>{`"${s.text}"`}</span>
                  <span style={{ fontSize: 10, color: "#444" }}>{`– ${s.by}`}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, padding: 12, marginTop: 10 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: "#444", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
            Praktisk info
          </div>
          <div style={{ fontSize: 10, color: "#555", lineHeight: 1.7 }}>
            <strong style={{ color: "#888" }}>Bokning:</strong> Pappa bokar i sitt namn. Ca 10 pers.<br />
            <strong style={{ color: "#888" }}>Budget:</strong> Max 700kr/pers. Enbart mat – dricka betalar vi själva.<br />
            <strong style={{ color: "#888" }}>Ålder:</strong> Vi är 19. Ställen med 23+ är bortfiltrerade.<br />
            <strong style={{ color: "#888" }}>Priser:</strong> Copine, Glashuset, Brisket, Dersch = verifierade menyer (mars 2026). Övriga = uppskattningar.<br />
            <strong style={{ color: "#888" }}>Dag:</strong> Lördag kväll.
          </div>
        </div>

      </div>
    </div>
  );
}

