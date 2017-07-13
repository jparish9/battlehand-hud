var __extends = (this && this.__extends) || (function () {
   var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var bh;
(function (bh) {
    var Cacheable = (function () {
        function Cacheable() {
            this._cache = {};
        }
        Cacheable.prototype.clearCache = function () {
            this._cache = {};
        };
        Cacheable.prototype.fromCache = function (key, fn) {
            if (!(key in this._cache)) {
                this._cache[key] = fn();
            }
            return this._cache[key];
        };
        return Cacheable;
    }());
    bh.Cacheable = Cacheable;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var ElementType;
    (function (ElementType) {
        ElementType[ElementType["Fire"] = 0] = "Fire";
        ElementType[ElementType["Earth"] = 1] = "Earth";
        ElementType[ElementType["Air"] = 2] = "Air";
        ElementType[ElementType["Spirit"] = 3] = "Spirit";
        ElementType[ElementType["Water"] = 4] = "Water";
        ElementType[ElementType["Neutral"] = 5] = "Neutral";
    })(ElementType = bh.ElementType || (bh.ElementType = {}));
    var ItemType;
    (function (ItemType) {
        ItemType[ItemType["EvoJar"] = 0] = "EvoJar";
        ItemType[ItemType["Crystal"] = 1] = "Crystal";
        ItemType[ItemType["Rune"] = 2] = "Rune";
    })(ItemType = bh.ItemType || (bh.ItemType = {}));
    var KlassType;
    (function (KlassType) {
        KlassType[KlassType["Magic"] = 0] = "Magic";
        KlassType[KlassType["Might"] = 1] = "Might";
        KlassType[KlassType["Skill"] = 2] = "Skill";
    })(KlassType = bh.KlassType || (bh.KlassType = {}));
    var PositionType;
    (function (PositionType) {
        PositionType[PositionType["Member"] = 0] = "Member";
        PositionType[PositionType["Elder"] = 1] = "Elder";
        PositionType[PositionType["CoLeader"] = 2] = "CoLeader";
        PositionType[PositionType["Leader"] = 3] = "Leader";
    })(PositionType = bh.PositionType || (bh.PositionType = {}));
    var RarityType;
    (function (RarityType) {
        RarityType[RarityType["Common"] = 0] = "Common";
        RarityType[RarityType["Uncommon"] = 1] = "Uncommon";
        RarityType[RarityType["Rare"] = 2] = "Rare";
        RarityType[RarityType["SuperRare"] = 3] = "SuperRare";
        RarityType[RarityType["Legendary"] = 4] = "Legendary";
    })(RarityType = bh.RarityType || (bh.RarityType = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var EvoReport = (function () {
        function EvoReport(card, evo) {
            this.wildCards = bh.data.wildsForEvo(card.rarityType, evo);
            this.minSot = bh.data.getMinSotNeeded(card.rarityType, evo);
            this.maxSot = bh.data.getMaxSotNeeded(card.rarityType, evo);
            this.minGold = bh.data.getMinGoldNeeded(card.rarityType, evo);
        }
        return EvoReport;
    }());
    bh.EvoReport = EvoReport;
    var EvoReportCard = (function () {
        function EvoReportCard(card) {
            this.reports = [];
            var evo = card.evo, max = bh.data.cards.battle.getMaxEvo(card.rarityType);
            for (var i = evo; i < max; i++) {
                this.reports.push(new EvoReport(card, i));
            }
        }
        Object.defineProperty(EvoReportCard.prototype, "next", {
            get: function () { return this.reports[0]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EvoReportCard.prototype, "wildCards", {
            get: function () { return this.reports.reduce(function (count, report) { return count + report.wildCards; }, 0); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EvoReportCard.prototype, "minSot", {
            get: function () { return this.reports.reduce(function (count, report) { return count + report.minSot; }, 0); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EvoReportCard.prototype, "maxSot", {
            get: function () { return this.reports.reduce(function (count, report) { return count + report.maxSot; }, 0); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EvoReportCard.prototype, "minGold", {
            get: function () { return this.reports.reduce(function (count, report) { return count + report.minGold; }, 0); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EvoReportCard.prototype, "maxGold", {
            get: function () { return this.reports.reduce(function (count, report) { return count + report.maxGold; }, 0); },
            enumerable: true,
            configurable: true
        });
        return EvoReportCard;
    }());
    bh.EvoReportCard = EvoReportCard;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var AbilityType;
    (function (AbilityType) {
        AbilityType[AbilityType["Trait"] = 0] = "Trait";
        AbilityType[AbilityType["Active"] = 1] = "Active";
        AbilityType[AbilityType["Passive"] = 2] = "Passive";
    })(AbilityType = bh.AbilityType || (bh.AbilityType = {}));
    function createHeroAbility(hero, heroAbility) {
        return { hero: hero, guid: heroAbility.abilityGuid, name: heroAbility.abilityName, type: heroAbility.abilityType };
    }
    var Hero = (function () {
        function Hero(heroAbilities) {
            var trait = heroAbilities[0], active = heroAbilities[1], passive = heroAbilities[2];
            this.guid = trait.heroGuid;
            this.name = trait.heroName;
            this.elementType = trait.elementType;
            this.klassType = trait.klassType;
            this.trait = createHeroAbility(this, trait);
            this.active = createHeroAbility(this, active);
            this.passive = createHeroAbility(this, passive);
            this.lower = this.name.toLowerCase();
        }
        Object.defineProperty(Hero.prototype, "abilities", {
            get: function () { return [this.trait, this.active, this.passive]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Hero.prototype, "allBattleCards", {
            get: function () {
                return Hero.filterCardsByHero(this, bh.data.cards.battle.getAll());
            },
            enumerable: true,
            configurable: true
        });
        Hero.prototype.getHitPoints = function (level) {
            return Hero.getHitPoints(this, level);
        };
        Object.defineProperty(Hero.prototype, "maxPowerRating", {
            get: function () {
                return bh.PowerRating.rateMaxedHero(this);
            },
            enumerable: true,
            configurable: true
        });
        Hero.filterCardsByHero = function (hero, cards) {
            return cards.filter(function (card) { return card.klassType === hero.klassType && (card.elementType == bh.ElementType.Neutral || card.elementType == hero.elementType); });
        };
        Hero.getHitPoints = function (hero, level) {
            switch (hero.name) {
                case "Bree":
                case "Hawkeye":
                case "Krell":
                    return Math.floor(5 * level * level + 2.5 * level + 167.5);
                case "Monty":
                case "Trix":
                    return Math.floor(4.286 * level * level + 2.142 * level + 143.572);
                case "Jinx":
                case "Logan":
                case "Red":
                    return 4 * level * level + 2 * level + 134;
                case "Fergus":
                    return 6 * level * level + 3 * level + 201;
                case "Brom":
                case "Gilda":
                    return Math.floor(5.714 * level * level + 2.858 * level + 191.438);
                case "Peg":
                    return Math.floor(4.5 * level * level + 2 * level + 153.5);
                case "Thrudd":
                    return Math.floor(38 / 7 * level * level + 19 / 7 * level + 190 - 38 / 7 - 19 / 7);
                default:
                    console.log(hero.name);
                    return 0;
            }
        };
        return Hero;
    }());
    bh.Hero = Hero;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var Repo = (function () {
        function Repo(idOrGid, gidOrCacheable, cacheable) {
            Repo.AllRepos.push(this);
            this.id = typeof (gidOrCacheable) == "number" ? idOrGid : null,
                this.gid = typeof (gidOrCacheable) == "number" ? gidOrCacheable : idOrGid;
            this.cacheable = gidOrCacheable === true || cacheable === true;
        }
        Repo.prototype.init = function () {
            var _this = this;
            if (!this._init) {
                this._init = new Promise(function (resolvefn) {
                    var tsv = (bh.TSV || {})[String(_this.gid || _this.id)];
                    if (!tsv && _this.cacheable) {
                        try {
                            var cache = JSON.parse(localStorage.getItem(_this.id + "-" + _this.gid) || null);
                            if (cache && cache.date && (new Date().getTime() < cache.date + 1000 * 60 * 60 * 24)) {
                                tsv = cache.tsv || null;
                            }
                        }
                        catch (ex) { }
                    }
                    if (tsv) {
                        _this.resolveTsv(tsv, resolvefn);
                    }
                    else if (typeof (_this.gid) == "number") {
                        Repo.fetchTsv(_this.id, _this.gid).then(function (tsv) { return _this.resolveTsv(tsv, resolvefn); }, function () { return _this.unresolveTsv(); });
                    }
                    else {
                        resolvefn(_this.data = []);
                    }
                });
            }
            return this._init;
        };
        Repo.prototype.resolveTsv = function (tsv, resolvefn) {
            var _this = this;
            if (this.cacheable) {
                try {
                    localStorage.setItem(this.id + "-" + this.gid, JSON.stringify({ tsv: tsv, date: new Date().getTime() }));
                }
                catch (ex) { }
            }
            var parsed = this.parseTsv(tsv);
            if (parsed instanceof Promise) {
                parsed.then(function (data) { return resolvefn(data); }, function () { return _this.unresolveTsv(); });
            }
            else {
                resolvefn(parsed);
            }
        };
        Repo.prototype.unresolveTsv = function () {
            this.data = [];
        };
        Repo.prototype.parseTsv = function (tsv) {
            return this.data = Repo.mapTsv(tsv);
        };
        Object.defineProperty(Repo.prototype, "all", {
            get: function () {
                return this.data.slice();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Repo.prototype, "length", {
            get: function () {
                return this.data.length;
            },
            enumerable: true,
            configurable: true
        });
        Repo.prototype.find = function (value) {
            var lower = value.toLowerCase();
            return this.data.find(function (t) { return t.guid == value || t.name == value || t.lower == lower; });
        };
        Repo.prototype.put = function (value) {
            var index = this.data.findIndex(function (t) { return t.guid == value.guid; });
            if (-1 < index) {
                this.data[index] = value;
            }
            else {
                this.data.push(value);
            }
        };
        Repo.fetchTsv = function (idOrGid, gidOrUndefined) {
            var id = typeof (gidOrUndefined) == "number" ? idOrGid : null, gid = typeof (gidOrUndefined) == "number" ? gidOrUndefined : idOrGid;
            if ((bh.TSV || {})[String(gid)]) {
                return Promise.resolve(bh.TSV[String(gid)]);
            }
            return XmlHttpRequest.get(bh.host + "/tsv.php?gid=" + gid + (id ? "&id=" + id : ""));
        };
        Repo.mapTsv = function (raw) {
            var lines = raw.split(/\n/), keys = lines.shift().split(/\t/).map(function (s) { return s.trim(); });
            return lines
                .map(function (line) {
                if (!line.trim().length) {
                    return null;
                }
                var parts = line.split(/\t/).map(function (s) { return s.trim(); }), value = {};
                keys.forEach(function (key, index) {
                    switch (key) {
                        case "element":
                        case "elementType":
                            value["elementType"] = bh.ElementType[parts[index]];
                            break;
                        case "rarity":
                        case "rarityType":
                            value["rarityType"] = bh.RarityType[parts[index].replace(/ /g, "")];
                            break;
                        case "klass":
                        case "klassType":
                            value["klassType"] = bh.KlassType[parts[index]];
                            break;
                        case "itemType":
                            value["itemType"] = bh.ItemType[parts[index].replace(/ /g, "")];
                            break;
                        case "abilityType":
                            value["abilityType"] = bh.AbilityType[parts[index]];
                            break;
                        case "brag":
                            value["brag"] = !!parts[index].match(/\d+(,\d+)*/);
                            break;
                        case "turns":
                            value["turns"] = +parts[index];
                            break;
                        case "name":
                            value["lower"] = parts[index].toLowerCase();
                        default:
                            value[key] = parts[index];
                            break;
                    }
                });
                return value;
            })
                .filter(function (value) { return value != null; });
        };
        Repo.init = function () {
            return Repo.AllRepos.map(function (repo) { return repo.init(); });
        };
        Repo.AllRepos = [];
        return Repo;
    }());
    bh.Repo = Repo;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var HeroRepo = (function (_super) {
        __extends(HeroRepo, _super);
        function HeroRepo() {
            return _super.call(this, 411895816, true) || this;
        }
        HeroRepo.prototype.parseTsv = function (tsv) {
            var _this = this;
            return new Promise(function (resolvefn) {
                var mapped = bh.Repo.mapTsv(tsv), heroes = [];
                while (mapped.length) {
                    heroes.push(new bh.Hero([mapped.shift(), mapped.shift(), mapped.shift()]));
                }
                resolvefn(_this.data = heroes);
            });
        };
        HeroRepo.prototype.filterByElement = function (elementOrElementType) {
            return this.data.filter(function (hero) { return hero.elementType === elementOrElementType || bh.ElementType[hero.elementType] === elementOrElementType; });
        };
        Object.defineProperty(HeroRepo.prototype, "sorted", {
            get: function () {
                if (!this._sorted) {
                    this._sorted = this.data.slice().sort(bh.utils.sort.byElementThenKlass);
                }
                return this._sorted;
            },
            enumerable: true,
            configurable: true
        });
        HeroRepo.prototype.sortBy = function (sort) {
            if (!sort) {
                return this.sorted;
            }
            return this.data.slice().sort(sort);
        };
        return HeroRepo;
    }(bh.Repo));
    bh.HeroRepo = HeroRepo;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var ItemRepo = (function (_super) {
        __extends(ItemRepo, _super);
        function ItemRepo() {
            return _super.call(this, 879699541, true) || this;
        }
        Object.defineProperty(ItemRepo.prototype, "evoJars", {
            get: function () {
                return this.data.filter(function (item) { return item.itemType === bh.ItemType.EvoJar; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemRepo.prototype, "crystals", {
            get: function () {
                return this.data.filter(function (item) { return item.itemType === bh.ItemType.Crystal; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemRepo.prototype, "runes", {
            get: function () {
                return this.data.filter(function (item) { return item.itemType === bh.ItemType.Rune; });
            },
            enumerable: true,
            configurable: true
        });
        ItemRepo.getValue = function (itemType, rarityType) {
            if (itemType == bh.ItemType.Crystal)
                return 1000;
            if (itemType == bh.ItemType.Rune)
                return 2000;
            return [300, 800, 1500, 3000][rarityType];
        };
        Object.defineProperty(ItemRepo, "sandsOfTime", {
            get: function () { return bh.data.ItemRepo.find("Sands of Time"); },
            enumerable: true,
            configurable: true
        });
        return ItemRepo;
    }(bh.Repo));
    bh.ItemRepo = ItemRepo;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var messenger;
    var Messenger = (function () {
        function Messenger(win, callbackfn) {
            var _this = this;
            this.win = win;
            this.callbackfn = callbackfn;
            window.addEventListener("message", function (ev) {
                var message = ev.data || (ev.originalEvent && ev.originalEvent.data) || null;
                if (Messenger.isValidMessage(message)) {
                    _this.updateActive(message);
                    _this.callbackfn(message);
                }
            });
        }
        Object.defineProperty(Messenger.prototype, "targetWindow", {
            get: function () {
                if (!this._targetWindow) {
                    if (bh.isHud) {
                        var iframe = bh.$("#gameiframe")[0];
                        this._targetWindow = iframe && iframe.contentWindow || null;
                    }
                    if (bh.isListener) {
                        this._targetWindow = this.win && this.win.parent || null;
                    }
                }
                if (!this._targetWindow) {
                    console.log("no target window: " + location.href);
                }
                return this._targetWindow;
            },
            enumerable: true,
            configurable: true
        });
        Messenger.prototype.updateActive = function (message) {
            if (message.playerGuid !== message.action && message.sessionKey !== message.action) {
                if (!Messenger.ActivePlayerGuid || Messenger.ActivePlayerGuid !== message.playerGuid)
                    Messenger.ActivePlayerGuid = message.playerGuid;
                if (!Messenger.ActiveSessionKey || Messenger.ActiveSessionKey !== message.sessionKey)
                    Messenger.ActiveSessionKey = message.sessionKey;
            }
        };
        Messenger.prototype.postMessage = function (message) {
            if (Messenger.isValidMessage(message)) {
                this.updateActive(message);
                this.targetWindow.postMessage(message, "*");
            }
            else {
                console.log("invalid message: " + (message && message.action || "[no message]"));
            }
        };
        Messenger.isValidMessage = function (message) {
            if (!message) {
                return false;
            }
            var keys = Object.keys(message);
            return keys.includes("action") && keys.includes("playerGuid") && keys.includes("sessionKey") && keys.includes("data");
        };
        Messenger.createMessage = function (action, data) {
            return {
                action: action,
                playerGuid: Messenger.ActivePlayerGuid,
                sessionKey: Messenger.ActiveSessionKey,
                data: data
            };
        };
        Messenger.initialize = function (targetWindow, callbackfn) {
            return messenger = new Messenger(targetWindow, callbackfn);
        };
        Object.defineProperty(Messenger, "instance", {
            get: function () { return messenger; },
            enumerable: true,
            configurable: true
        });
        return Messenger;
    }());
    bh.Messenger = Messenger;
})(bh || (bh = {}));
var bh;
(function (bh) {
    function formatRow(imageGroup, imageName, name, badgeValue) {
        if (typeof (badgeValue) == "number") {
            badgeValue = bh.utils.formatNumber(badgeValue);
        }
        return "<div data-hud=\"true\">" + bh.getImg20(imageGroup, imageName) + " " + name + "<span class=\"badge pull-right\">" + badgeValue + "</span></div>";
    }
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(json, isArena) {
            if (isArena === void 0) { isArena = false; }
            var _this = _super.call(this) || this;
            _this.isArena = isArena;
            if (bh.data.isPlayer(json)) {
                _this._pp = json;
            }
            if (bh.data.isGuildPlayer(json)) {
                _this._gp = json;
            }
            return _this;
        }
        Object.defineProperty(Player.prototype, "fameLevel", {
            get: function () { return (this._pp && this._pp.fameLevel || this._gp.fameLevel) + 1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "fragments", {
            get: function () { return this._pp && this._pp.fragments || 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "fragmentsRowHtml", {
            get: function () { return this._pp ? formatRow("misc", "Fragments", "Fragments", this.fragments) : ""; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "gems", {
            get: function () { return this._pp && this._pp.gems || 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "gemsRowHtml", {
            get: function () { return this._pp ? formatRow("misc", "GemStone", "Gems", this.gems) : ""; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "gold", {
            get: function () { return this._pp && this._pp.gold || 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "goldNeeded", {
            get: function () {
                var _this = this;
                return this.fromCache("goldNeeded", function () {
                    var needed = 0;
                    _this.activeBattleCards.forEach(function (battleCard) { return needed += battleCard.maxMaxGoldNeeded; });
                    _this.heroes.forEach(function (playerHero) { return needed += playerHero ? playerHero.trait.maxGoldCost + playerHero.active.maxGoldCost + playerHero.passive.maxGoldCost : 0; });
                    return needed;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "goldRowHtml", {
            get: function () {
                var needed = this.goldNeeded, asterisk = "<sup>*</sup>", badge = needed ? bh.utils.formatNumber(this.gold) + " / " + bh.utils.formatNumber(Math.abs(needed)) + asterisk : bh.utils.formatNumber(this.gold);
                return this._pp ? formatRow("misc", "Coin", "Gold", badge) : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "guid", {
            get: function () { return this._pp && this._pp.id || this._gp.playerId; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "guild", {
            get: function () { return bh.data.guilds.findByGuid(this.guildGuid); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "guildGuid", {
            get: function () { return this._pp ? this._pp.playerGuild || null : this._gp && this._gp.guildId || null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "guildParent", {
            get: function () { var guildName = bh.data.guilds.findNameByGuid(this.guildGuid); return guildName && guildName.parent || null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "guilds", {
            get: function () {
                var _this = this;
                return this.fromCache("guilds", function () { return bh.data.guilds.filterNamesByParent(_this.guildParent); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "heroes", {
            get: function () {
                var _this = this;
                return this.fromCache("heroes", function () {
                    var archetypes;
                    if (_this._pp) {
                        archetypes = _this._pp.archetypes || [];
                    }
                    else {
                        archetypes = Object.keys(_this._gp.archetypeLevels).map(function (guid) {
                            return { playerId: _this.guid, id: guid, level: _this._gp.archetypeLevels[guid] };
                        });
                    }
                    return archetypes.map(function (archetype) { return new bh.PlayerHero(_this, archetype); });
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "isAlly", {
            get: function () {
                var _this = this;
                return this.fromCache("isAlly", function () { return !!Player.me.guilds.find(function (g) { return g.guid == _this.guildGuid; }); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "canScout", {
            get: function () { return this.guid == "b0a8b57b-54f5-47d8-8b7a-f9dac8300ca0"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "isExtended", {
            get: function () { return !!this._pp; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "isFullMeat", {
            get: function () { return this.heroes.length == bh.data.HeroRepo.length && !this.heroes.find(function (hero) { return !hero.isMeat; }); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "isMe", {
            get: function () { return [bh.Messenger.ActivePlayerGuid, "b0a8b57b-54f5-47d8-8b7a-f9dac8300ca0"].includes(this.guid); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "name", {
            get: function () { return this._pp ? this._pp.name : this._gp && this._gp.name || null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "position", {
            get: function () { return this._gp && this._gp.position || null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "averagePowerPercent", {
            get: function () { var percents = this.heroes.map(function (ph) { return ph.powerPercent; }); return Math.floor(percents.reduce(function (out, p) { return out + p; }, 0) / percents.length); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "powerPercent", {
            get: function () { var percentSum = this.heroes.map(function (ph) { return ph.powerPercent; }).reduce(function (score, pp) { return score + pp; }, 0), max = bh.data.HeroRepo.length * 100; return Math.floor(100 * percentSum / max); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "powerRating", {
            get: function () { return this.heroes.reduce(function (power, hero) { return power + hero.powerRating; }, 0); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "raidRowHtml", {
            get: function () { return this._pp ? formatRow("keys", "RaidTicket", "Raid Tickets", this.raidTickets) : ""; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "raidTickets", {
            get: function () { return this._pp && this._pp.raidKeys || 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "battleCards", {
            get: function () {
                var _this = this;
                return this.fromCache("battleCards", function () { return !(_this._pp && _this._pp.playerCards && _this._pp.playerCards.cards) ? [] : _this.sortAndReduceBattleCards(Object.keys(_this._pp.playerCards.cards)); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "activeBattleCards", {
            get: function () {
                var _this = this;
                return this.fromCache("activeBattleCards", function () { return _this.battleCards.filter(function (battleCard) { return battleCard.isActive; }); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "activeRecipes", {
            get: function () {
                var _this = this;
                return this.fromCache("activeRecipes", function () { return _this.activeBattleCards.map(function (bc) { return new bh.Recipe(bc, true); }).filter(function (r) { return !!r; }); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "boosterCards", {
            get: function () { var map = this._pp && this._pp.feederCardsMap; return !map ? [] : Object.keys(map).map(function (guid) { return new bh.PlayerBoosterCard(guid, map[guid]); }).sort(bh.utils.sort.byElementThenRarityThenName); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "boosterCount", {
            get: function () { var count = 0, map = this._pp && this._pp.feederCardsMap; Object.keys(map || {}).map(function (guid) { return count += map[guid]; }); return count; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "boosterRowHtml", {
            get: function () { return this._pp ? bh.PlayerBoosterCard.rowHtml(this.boosterCount) : ""; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "inventory", {
            get: function () {
                var _this = this;
                var mats = this._pp && this._pp.craftingMaterials, playerHeroes = this.heroes;
                return !mats ? [] : Object.keys(mats).map(function (guid) { return new bh.PlayerInventoryItem(_this, bh.data.ItemRepo.find(guid), mats[guid]); }).sort(bh.utils.sort.byRarityThenName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "wildCards", {
            get: function () {
                var _this = this;
                return this.fromCache("wildCards", function () { return bh.data.WildCardRepo.all.map(function (wc) { return new bh.PlayerWildCard(_this, wc.guid); }); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "wildCardRowHtml", {
            get: function () { return this._pp ? formatRow("cardtypes", "WildCard", "Wild Cards", this.wildCards.filter(function (wc) { return wc.count; }).slice(-3).map(function (wc) { return bh.RarityType[wc.rarityType][0] + ":" + wc.count; }).join(" / ")) : ""; },
            enumerable: true,
            configurable: true
        });
        Player.prototype.battleCardToPlayerBattleInfo = function (guid) {
            var playerCard = this._pp.playerCards.cards[guid];
            return new bh.PlayerBattleCard(playerCard);
        };
        Player.prototype.filterActiveBattleCards = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var element, rarity, name, hero;
            args.forEach(function (arg) { return bh.isElement(arg) ? element = arg : bh.isRarity(arg) ? rarity = arg : name = arg; });
            if (name)
                hero = bh.data.HeroRepo.find(name);
            return this.activeBattleCards.filter(function (battleCard) { return battleCard.matchesElement(element) && battleCard.matchesRarity(rarity) && battleCard.matchesHero(hero); });
        };
        Player.prototype.filterHeroes = function (elementOrName) {
            var element = bh.isElement(elementOrName) ? elementOrName : null, name = !element ? elementOrName : null;
            return this.heroes.filter(function (playerHero) { return playerHero && ((element && bh.ElementType[playerHero.elementType] == element) || (name && playerHero.name == name)); });
        };
        Player.prototype.findPlayerCard = function (guid) {
            var cards = this._pp && this._pp.playerCards.cards, card = cards && cards[guid];
            if (!card && cards) {
                var guids = Object.keys(cards), match = guids.find(function (g) { return g == guid || cards[g].configId == guid; });
                card = cards[match];
            }
            return card;
        };
        Player.prototype.merge = function (player) {
            var mine = this._pp && this._pp.archetypes || [], theirs = player.archetypes || [];
            theirs.forEach(function (theirArch) {
                if (!mine.find(function (myArch) { return myArch.id == theirArch.id; })) {
                    mine.push(theirArch);
                }
            });
        };
        Player.prototype.sortAndReduceBattleCards = function (guids) {
            var _this = this;
            var cards = guids.map(function (guid) { return _this.battleCardToPlayerBattleInfo(guid); }), sorted = cards.sort(bh.utils.sort.byRarityThenNameThenEvoLevel), reduced = [];
            sorted.forEach(function (card) {
                var existing = reduced.find(function (c) { return c.matches(card); });
                if (existing) {
                    existing.count++;
                }
                else {
                    reduced.push(card);
                }
            });
            return reduced;
        };
        Object.defineProperty(Player, "me", {
            get: function () { return bh.data.PlayerRepo.find(bh.Messenger.ActivePlayerGuid); },
            enumerable: true,
            configurable: true
        });
        return Player;
    }(bh.Cacheable));
    bh.Player = Player;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var PlayerBattleCard = (function () {
        function PlayerBattleCard(playerCard) {
            this.playerCard = playerCard;
            this.count = 1;
            if (!(this._bc = bh.data.cards.battle.find(playerCard.configId))) {
                console.log("Missing BattleCard:", this.name + ": " + playerCard.id + " (" + this.evoLevel + ")");
            }
        }
        PlayerBattleCard.prototype._rowChildren = function () {
            var _this = this;
            var me = bh.Player.me, activeRecipe = new bh.Recipe(this, true), html = "";
            if (activeRecipe) {
                var goldNeeded = bh.data.calcMaxGoldNeeded(this.playerCard, this.evoLevel) * this.count, goldOwned = me.gold, goldColor = goldOwned < goldNeeded ? "bg-danger" : "bg-success";
                html += "<div>" + bh.getImg20("misc", "Coin") + " Gold <span class=\"badge pull-right " + goldColor + "\">" + bh.utils.formatNumber(goldOwned) + " / " + bh.utils.formatNumber(goldNeeded) + "</span></div>";
                activeRecipe.all.forEach(function (recipeItem) {
                    var item = me.inventory.find(function (item) { return item.guid == recipeItem.item.guid; });
                    html += bh.PlayerInventoryItem.toRowHtml(item, item.count, recipeItem.max * _this.count);
                });
                var wcNeeded = bh.data.getMaxWildCardsNeeded(this) * this.count, wcOwned = me.wildCards[this.rarityType] && me.wildCards[this.rarityType].count || 0, wcColor = wcOwned < wcNeeded ? "bg-danger" : "bg-success";
                html += "<div>" + bh.getImg20("cardtypes", "WildCard") + " " + bh.RarityType[this.rarityType] + " WC <span class=\"badge pull-right " + wcColor + "\">" + bh.utils.formatNumber(wcOwned) + " / " + bh.utils.formatNumber(wcNeeded) + "</span></div>";
            }
            return html;
        };
        PlayerBattleCard.prototype._rowHtml = function (badgeValue, badgeCss) {
            var badgeHtml = badgeValue ? "<span class=\"badge pull-right " + (badgeCss || "") + "\">" + badgeValue + "</span>" : "", children = typeof (badgeValue) == "number" || this.isMaxed ? "" : this._rowChildren(), content = bh.renderExpandable(this.playerCard.id, "" + this.fullHtml + badgeHtml, children);
            return "<div -class=\"" + bh.ElementType[this.elementType] + "\" data-element-type=\"" + this.elementType + "\" data-rarity-type=\"" + this.rarityType + "\" data-klass-type=\"" + this.klassType + "\" data-brag=\"" + (this.brag ? "Brag" : "") + "\">" + content + "</div>";
        };
        Object.defineProperty(PlayerBattleCard.prototype, "brag", {
            get: function () { return this._bc && this._bc.brag || false; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "elementType", {
            get: function () { return this._bc ? this._bc.elementType : null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "klassType", {
            get: function () { return this._bc ? this._bc.klassType : null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "name", {
            get: function () { return this._bc && this._bc.name || this.playerCard && this.playerCard.configId; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "lower", {
            get: function () { return this.name.toLowerCase(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "rarityType", {
            get: function () { return this._bc ? this._bc.rarityType : null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "type", {
            get: function () { return this._bc && this._bc.type || null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "baseValue", {
            get: function () { return this._bc && this._bc.base || 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "maxValue", {
            get: function () { return this._bc && this._bc.max || 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "tier", {
            get: function () { return this._bc && this._bc.tier || null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "mats", {
            get: function () { return this._bc && this._bc.mats || null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "evo", {
            get: function () { return this.playerCard && this.playerCard.evolutionLevel || 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "guid", {
            get: function () { return this.playerCard && this.playerCard.configId; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "level", {
            get: function () { return this.playerCard && (this.playerCard.level + 1) || 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "battleOrBragImage", {
            get: function () { return bh.getImg20("cardtypes", this.brag ? "Brag" : "BattleCard"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "evoLevel", {
            get: function () { return this.evo + "." + ("0" + this.level).slice(-2); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "formattedValue", {
            get: function () { return this.value ? bh.utils.formatNumber(this.value) : ""; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "fullHtml", {
            get: function () {
                var count = this.count > 1 ? "x" + this.count : "", typeAndValue = this.value ? " (" + this.typeImage + " " + this.formattedValue : "", stars = bh.utils.evoToStars(this.rarityType, this.evoLevel), name = this.name.replace(/Mischievous/, "Misch.").replace(/Protection/, "Prot.");
                return this.battleOrBragImage + " " + this.evoLevel + " <small>" + stars + "</small> " + name + " " + count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "isActive", {
            get: function () { return (this.evo > 0 || this.level > 1) && !this.isMaxed; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "isMaxed", {
            get: function () { return this.evoLevel == ["1.10", "2.20", "3.35", "4.50", "5.50"][this.rarityType]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "maxWildCardsNeeded", {
            get: function () { return bh.data.getMaxWildCardsNeeded(this) * this.count; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "nextWildCardsNeeded", {
            get: function () { return bh.data.getNextWildCardsNeeded(this) * this.count; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "maxMaxSotNeeded", {
            get: function () { return bh.data.calcMaxSotNeeded(this.playerCard, this.evoLevel) * this.count; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "nextMaxSotNeeded", {
            get: function () { return bh.data.getMaxSotNeeded(this.rarityType, this.evo) * this.count; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "maxMaxGoldNeeded", {
            get: function () { return bh.data.calcMaxGoldNeeded(this.playerCard, this.evoLevel) * this.count; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "nextMaxGoldNeeded", {
            get: function () { return bh.data.getMaxGoldNeeded(this.rarityType, this.evo) * this.count; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "powerRating", {
            get: function () { return bh.PowerRating.ratePlayerCard(this.playerCard); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "rarityEvoLevel", {
            get: function () { return bh.RarityType[this.rarityType][0] + "." + this.evoLevel; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "rowHtml", {
            get: function () { return this._rowHtml(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "scoutHtml", {
            get: function () { return this.rarityEvoLevel + " " + this.name + " " + (this.count > 1 ? "x" + this.count : ""); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "typeImage", {
            get: function () { return this.type ? bh.getImg("cardtypes", this.type) : ""; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBattleCard.prototype, "value", {
            get: function () { return this.playerCard && bh.data.cards.battle.calculateValue(this.playerCard) || 0; },
            enumerable: true,
            configurable: true
        });
        ;
        PlayerBattleCard.prototype.matches = function (other) { return this._bc && other._bc && this._bc.guid == other._bc.guid && this.evoLevel == other.evoLevel; };
        PlayerBattleCard.prototype.matchesElement = function (element) { return !element || this.elementType === bh.ElementType[element]; };
        PlayerBattleCard.prototype.matchesHero = function (hero) { return !hero || (this.matchesElement(bh.ElementType[hero.elementType]) && this.klassType === hero.klassType); };
        PlayerBattleCard.prototype.matchesRarity = function (rarity) { return !rarity || this.rarityType === bh.RarityType[rarity]; };
        PlayerBattleCard.prototype.toRowHtml = function (needed, owned) { return this._rowHtml(needed, owned < needed ? "bg-danger" : "bg-success"); };
        return PlayerBattleCard;
    }());
    bh.PlayerBattleCard = PlayerBattleCard;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var PlayerBoosterCard = (function () {
        function PlayerBoosterCard(guid, count) {
            if (count === void 0) { count = 0; }
            this.count = count;
            this.type = "BoosterCard";
            this._ = bh.data.BoosterCardRepo.find(guid);
        }
        Object.defineProperty(PlayerBoosterCard.prototype, "challenge", {
            get: function () { return this._.challenge; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBoosterCard.prototype, "elementType", {
            get: function () { return this._.elementType; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBoosterCard.prototype, "guid", {
            get: function () { return this._.guid; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBoosterCard.prototype, "name", {
            get: function () { return this._.name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBoosterCard.prototype, "rarityType", {
            get: function () { return this._.rarityType; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerBoosterCard.prototype, "rowHtml", {
            get: function () { return "<div class=\"" + bh.ElementType[this.elementType] + "\" data-element-type=\"" + this.elementType + "\" data-type=\"" + this.type + "\" data-rarity-type=\"" + this.rarityType + "\">" + bh.getImg20("misc", "Boosters") + " " + bh.RarityType[this.rarityType][0] + (this.challenge ? "*" : "") + " " + this.name + " <span class=\"badge pull-right\">" + this.count + "</span></div>"; },
            enumerable: true,
            configurable: true
        });
        PlayerBoosterCard.rowHtml = function (count) { return "<div data-hud=\"true\">" + bh.getImg20("misc", "Boosters") + " Boosters <span class=\"badge pull-right\">" + bh.utils.formatNumber(count) + "</span></div>"; };
        return PlayerBoosterCard;
    }());
    bh.PlayerBoosterCard = PlayerBoosterCard;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var PlayerHero = (function (_super) {
        __extends(PlayerHero, _super);
        function PlayerHero(player, archetype) {
            var _this = _super.call(this) || this;
            _this.player = player;
            _this.archetype = archetype;
            _this.hero = bh.data.HeroRepo.find(archetype.id);
            return _this;
        }
        PlayerHero.prototype.getAbilityLevel = function (abilityType) {
            var level = this.archetype.abilityLevels
                ? this.archetype.abilityLevels[this.hero.abilities[abilityType].guid]
                : null;
            return isNaN(level) ? 0 : level + 1;
        };
        Object.defineProperty(PlayerHero.prototype, "abilities", {
            get: function () { return this.hero.abilities; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "abilityLevels", {
            get: function () { return this.archetype.abilityLevels; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "active", {
            get: function () {
                var _this = this;
                return this.fromCache("active", function () { return new bh.PlayerHeroAbility(_this, _this.hero.active, _this.getAbilityLevel(bh.AbilityType.Active)); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "guid", {
            get: function () { return this.hero.guid; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "elementType", {
            get: function () { return this.hero.elementType; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "klassType", {
            get: function () { return this.hero.klassType; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "name", {
            get: function () { return this.hero.name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "passive", {
            get: function () {
                var _this = this;
                return this.fromCache("passive", function () { return new bh.PlayerHeroAbility(_this, _this.hero.passive, _this.getAbilityLevel(bh.AbilityType.Passive)); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "trait", {
            get: function () {
                var _this = this;
                return this.fromCache("trait", function () { return new bh.PlayerHeroAbility(_this, _this.hero.trait, _this.getAbilityLevel(bh.AbilityType.Trait)); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "activePowerRating", {
            get: function () { return this.active.powerRating; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "battleCards", {
            get: function () { return bh.Hero.filterCardsByHero(this.hero, this.player.battleCards); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "deck", {
            get: function () { return this.player.sortAndReduceBattleCards(this.archetype.deck); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "deckPowerRating", {
            get: function () { return this.deck.reduce(function (score, pbc) { return score + bh.PowerRating.ratePlayerCard(pbc.playerCard) * pbc.count; }, 0); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "hitPoints", {
            get: function () { return this.hero.getHitPoints(this.level); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "hitPointsPowerRating", {
            get: function () { return bh.PowerRating.ratePlayerHeroHitPoints(this); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "isActiveCapped", {
            get: function () { return this.active.level == bh.getMaxActive(this.hero, this.level); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "isCapped", {
            get: function () { return this.isActiveCapped && this.isPassiveCapped && this.isTraitCapped; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "isMeat", {
            get: function () { return this.level == bh.MaxLevel && this.isCapped; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "isOp", {
            get: function () { return !!this.deck.find(function (pbc) { return pbc.tier == "OP"; }); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "isPassiveCapped", {
            get: function () { return this.passive.level == bh.getMaxPassive(this.hero, this.level); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "isTraitCapped", {
            get: function () { return this.trait.level == bh.getMaxTrait(this.level); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "level", {
            get: function () { return this.archetype.level + 1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "passivePowerRating", {
            get: function () { return this.passive.powerRating; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "playerHeroAbilities", {
            get: function () { return [this.trait, this.active, this.passive]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "playerHeroGuid", {
            get: function () { return this.player.guid + "-" + this.hero.guid; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "powerPercent", {
            get: function () { return Math.floor(100 * this.powerRating / this.hero.maxPowerRating); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "powerRating", {
            get: function () { return Math.round(this.hitPointsPowerRating + this.traitPowerRating + this.activePowerRating + this.passivePowerRating + this.deckPowerRating); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHero.prototype, "traitPowerRating", {
            get: function () { return this.trait.powerRating; },
            enumerable: true,
            configurable: true
        });
        return PlayerHero;
    }(bh.Cacheable));
    bh.PlayerHero = PlayerHero;
})(bh || (bh = {}));
var bh;
(function (bh) {
    function getMaterialCostForTrait(level) {
        if (level < 2)
            return 1;
        if (level < 10)
            return 2;
        if (level < 18)
            return 3;
        if (level < 25)
            return 4;
        if (level < 33)
            return 5;
        if (level < 41)
            return 6;
        if (level < 49)
            return 7;
        if (level < 56)
            return 8;
        if (level < 64)
            return 9;
        if (level < 72)
            return 10;
        if (level < 80)
            return 11;
        if (level < 87)
            return 12;
        return 13;
    }
    function getGoldCostForTrait(level) {
        if (level == 1)
            return 1000;
        var delta = 754, gold = 3000;
        for (var i = 2; i < level; i++) {
            gold += delta;
            delta += 8;
        }
        return gold;
    }
    function getMaterialCostForActive(level) {
        if (level < 2)
            return 1;
        if (level < 7)
            return 3;
        if (level < 13)
            return 4;
        if (level < 18)
            return 5;
        if (level < 23)
            return 6;
        if (level < 28)
            return 7;
        if (level < 33)
            return 8;
        if (level < 38)
            return 9;
        if (level < 43)
            return 10;
        if (level < 48)
            return 11;
        if (level < 53)
            return 12;
        if (level < 58)
            return 13;
        if (level < 63)
            return 14;
        if (level < 68)
            return 15;
        if (level < 73)
            return 16;
        return 17;
    }
    function getGoldCostForActive(level) {
        if (level == 1)
            return 5000;
        var delta = 510, gold = 3500;
        for (var i = 2; i < level; i++) {
            gold += delta;
            delta += 20;
        }
        return gold;
    }
    function getMaterialCostForPassive(level) {
        if (level < 2)
            return 2;
        if (level < 6)
            return 4;
        if (level < 9)
            return 5;
        if (level < 12)
            return 6;
        if (level < 16)
            return 7;
        if (level < 19)
            return 8;
        if (level < 22)
            return 9;
        if (level < 26)
            return 10;
        if (level < 29)
            return 11;
        if (level < 32)
            return 12;
        if (level < 36)
            return 13;
        if (level < 39)
            return 14;
        if (level < 42)
            return 15;
        if (level < 46)
            return 16;
        if (level < 49)
            return 17;
        if (level < 52)
            return 18;
        if (level < 56)
            return 19;
        if (level < 59)
            return 20;
        return 21;
    }
    function getGoldCostForPassive(level) {
        if (level == 1)
            return 7000;
        var delta = 1015, gold = 10000;
        for (var i = 2; i < level; i++) {
            gold += delta;
            delta += 30;
        }
        return gold;
    }
    function getMaterialCountFor(abilityType, level) {
        switch (abilityType) {
            case bh.AbilityType.Trait: return getMaterialCostForTrait(level);
            case bh.AbilityType.Active: return getMaterialCostForActive(level);
            case bh.AbilityType.Passive: return getMaterialCostForPassive(level);
        }
    }
    bh.getMaterialCountFor = getMaterialCountFor;
    function getMaterialCountForRange(abilityType, from, to) {
        var count = 0;
        for (var i = from + 1, l = to + 1; i < l; i++) {
            count += getMaterialCountFor(abilityType, i);
        }
        return count;
    }
    bh.getMaterialCountForRange = getMaterialCountForRange;
    function getGoldCostFor(abilityType, level) {
        switch (abilityType) {
            case bh.AbilityType.Trait: return getGoldCostForTrait(level);
            case bh.AbilityType.Active: return getGoldCostForActive(level);
            case bh.AbilityType.Passive: return getGoldCostForPassive(level);
        }
    }
    bh.getGoldCostFor = getGoldCostFor;
    function getGoldCostForRange(abilityType, from, to) {
        var count = 0;
        for (var i = from + 1, l = to + 1; i < l; i++) {
            count += getGoldCostFor(abilityType, i);
        }
        return count;
    }
    bh.getGoldCostForRange = getGoldCostForRange;
    var PlayerHeroAbility = (function () {
        function PlayerHeroAbility(playerHero, heroAbility, level) {
            this.playerHero = playerHero;
            this.heroAbility = heroAbility;
            this.level = level;
        }
        Object.defineProperty(PlayerHeroAbility.prototype, "_type", {
            get: function () {
                if (this.hero.name == "Jinx") {
                    if (this.type == bh.AbilityType.Active)
                        return bh.AbilityType.Passive;
                    if (this.type == bh.AbilityType.Passive)
                        return bh.AbilityType.Active;
                }
                return this.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "hero", {
            get: function () { return this.heroAbility.hero; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "guid", {
            get: function () { return this.heroAbility.guid; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "name", {
            get: function () { return this.heroAbility.name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "type", {
            get: function () { return this.heroAbility.type; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "isLocked", {
            get: function () { return !this.level; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "isCapped", {
            get: function () { return this.level == this.levelCap; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "isMaxed", {
            get: function () { return this.level == this.levelMax; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "levelCap", {
            get: function () { return bh.getAbilityLevelCap(this); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "levelMax", {
            get: function () { return bh.getAbilityLevelMax(this); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "nextMaterialCount", {
            get: function () {
                return getMaterialCountFor(this._type, this.level + 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "maxMaterialCount", {
            get: function () {
                var type = this._type, max = bh.getAbilityMaxLevel(this.hero, this.heroAbility.type);
                return getMaterialCountForRange(type, this.level, max);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "nextGoldCost", {
            get: function () {
                return getGoldCostFor(this._type, this.level + 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "maxGoldCost", {
            get: function () {
                var type = this._type, max = bh.getAbilityMaxLevel(this.hero, this.heroAbility.type);
                return getGoldCostForRange(this._type, this.level, max);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "img", {
            get: function () {
                return bh.getImg("skills", this.playerHero.name + bh.AbilityType[this.type]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "materialHtml", {
            get: function () {
                var _this = this;
                var player = this.playerHero.player, count = this.type == bh.AbilityType.Trait ? player.inventory.find(function (item) { return item.itemType == bh.ItemType.Rune && item.elementType == _this.playerHero.elementType; }).count
                    : player.inventory.find(function (item) { return item.itemType == bh.ItemType.Crystal && item.elementType == _this.playerHero.elementType; }).count;
                var color = this.maxMaterialCount <= count ? "bg-success" : "bg-danger";
                return this.type == bh.AbilityType.Trait
                    ? "<div>" + bh.getImg("runes", this.name.replace(/\W/g, "")) + " " + (this.hero.name + "'s").replace("s's", "s'") + " " + bh.ElementType[this.hero.elementType] + " Rune <span class=\"badge pull-right " + color + "\">" + bh.utils.formatNumber(count) + " / " + bh.utils.formatNumber(this.maxMaterialCount || 0) + "</span></div>"
                    : "<div>" + bh.getImg("crystals", bh.ElementType[this.hero.elementType]) + " " + bh.ElementType[this.hero.elementType] + " Crystals <span class=\"badge pull-right " + color + "\">" + bh.utils.formatNumber(count) + " / " + bh.utils.formatNumber(this.maxMaterialCount || 0) + "</span></div>";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "goldHtml", {
            get: function () {
                var gold = this.playerHero.player.gold || 0, color = this.maxGoldCost <= gold ? "bg-success" : "bg-danger";
                return "<div>" + bh.getImg("misc", "Coin") + " Gold <span class=\"badge pull-right " + color + "\">" + bh.utils.formatNumber(gold) + " / " + bh.utils.formatNumber(this.maxGoldCost || 0) + "</span></div>";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerHeroAbility.prototype, "powerRating", {
            get: function () {
                return bh.PowerRating.ratePlayerHeroAbility(this) * (this.level / bh.getAbilityMaxLevel(this.hero, this.type));
            },
            enumerable: true,
            configurable: true
        });
        PlayerHeroAbility.prototype.toRowHtml = function (needed, owned) {
            var badgeCss = needed && owned ? owned < needed ? "bg-danger" : "bg-success" : "", badgeHtml = typeof (needed) == "number" ? "<span class=\"badge pull-right " + badgeCss + "\">" + bh.utils.formatNumber(needed) + "</span>" : "";
            return "<div>" + this.img + " " + this.playerHero.name + " " + bh.AbilityType[this.type] + " " + badgeHtml + "</div>";
        };
        return PlayerHeroAbility;
    }());
    bh.PlayerHeroAbility = PlayerHeroAbility;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var PlayerInventoryItem = (function () {
        function PlayerInventoryItem(player, item, count) {
            if (count === void 0) { count = 0; }
            this.player = player;
            this.item = item;
            this.count = count;
        }
        Object.defineProperty(PlayerInventoryItem.prototype, "elementType", {
            get: function () { return this.item.elementType; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInventoryItem.prototype, "guid", {
            get: function () { return this.item.guid; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInventoryItem.prototype, "itemType", {
            get: function () { return this.item.itemType; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInventoryItem.prototype, "name", {
            get: function () { return this.item.name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInventoryItem.prototype, "rarityType", {
            get: function () { return this.item.rarityType; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInventoryItem.prototype, "isCrystal", {
            get: function () { return this.itemType === bh.ItemType.Crystal; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInventoryItem.prototype, "isEvoJar", {
            get: function () { return this.itemType === bh.ItemType.EvoJar; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInventoryItem.prototype, "isSandsOfTime", {
            get: function () { return this.name === "Sands of Time"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInventoryItem.prototype, "isRune", {
            get: function () { return this.itemType === bh.ItemType.Rune; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInventoryItem.prototype, "needed", {
            get: function () {
                var _this = this;
                var needed = 0;
                if (this.isRune) {
                    var heroName = this.name.split("'")[0];
                    this.player
                        .filterHeroes(heroName)
                        .forEach(function (playerHero) { return needed += playerHero.trait.maxMaterialCount || 0; });
                    this.player
                        .filterActiveBattleCards(heroName, "Legendary")
                        .forEach(function (battleCard) { return needed += battleCard.count * 60; });
                }
                else if (this.isCrystal) {
                    this.player
                        .filterHeroes(bh.ElementType[this.elementType])
                        .forEach(function (playerHero) { return needed += (playerHero.active.maxMaterialCount || 0) + (playerHero.passive.maxMaterialCount || 0); });
                    this.player
                        .filterActiveBattleCards(bh.ElementType[this.elementType], "Legendary")
                        .forEach(function (battleCard) { return needed += battleCard.count * 60; });
                }
                else if (this.isSandsOfTime) {
                    this.player.activeBattleCards.forEach(function (playerBattleCard) { return needed += playerBattleCard.maxMaxSotNeeded; });
                }
                else {
                    var activeRecipes = this.player.activeRecipes, filtered = activeRecipes.filter(function (recipe) { return !!recipe.getItem(_this); });
                    filtered.forEach(function (recipe) { return needed += recipe.getMaxNeeded(_this); });
                }
                return needed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInventoryItem.prototype, "rowHtml", {
            get: function () {
                var _this = this;
                var folder = bh.ItemType[this.itemType].toLowerCase() + "s", name = this.isEvoJar ? this.name.replace(/\W/g, "") : this.isCrystal ? this.name.split(/ /)[0] : bh.data.HeroRepo.find(this.name.split("'")[0]).abilities[0].name.replace(/\W/g, ""), image = bh.getImg20(folder, name), needed = this.needed, ofContent = needed ? " / " + bh.utils.formatNumber(needed) : "", color = needed ? this.count >= needed ? "bg-success" : "bg-danger" : "", badge = "<span class=\"badge pull-right " + color + "\">" + bh.utils.formatNumber(this.count) + ofContent + "</span>", children = "";
                if (needed) {
                    if (this.isCrystal) {
                        this.player
                            .filterHeroes(bh.ElementType[this.elementType])
                            .forEach(function (playerHero) {
                            var active = playerHero.active, maxNeededActive, passive = playerHero.passive, maxNeededPassive;
                            if (maxNeededActive = active.maxMaterialCount) {
                                children += active.toRowHtml(maxNeededActive, _this.count);
                            }
                            if (maxNeededPassive = passive.maxMaterialCount) {
                                children += passive.toRowHtml(maxNeededPassive, _this.count);
                            }
                        });
                        this.player
                            .filterActiveBattleCards(bh.ElementType[this.elementType], "Legendary")
                            .forEach(function (battleCard) {
                            var maxNeeded = battleCard.count * bh.data.calcMaxCrystalsNeeded(battleCard.playerCard, battleCard.evoLevel);
                            children += battleCard.toRowHtml(maxNeeded, _this.count);
                        });
                    }
                    else if (this.isRune) {
                        var heroName = this.name.split("'")[0];
                        this.player
                            .filterHeroes(heroName)
                            .forEach(function (playerHero) {
                            var trait = playerHero.trait, maxNeeded;
                            if (maxNeeded = trait.maxMaterialCount) {
                                children += trait.toRowHtml(maxNeeded, _this.count);
                            }
                        });
                        this.player
                            .filterActiveBattleCards(heroName, "Legendary")
                            .forEach(function (battleCard) {
                            var maxNeeded = battleCard.count * bh.data.calcMaxRunesNeeded(battleCard.playerCard, battleCard.evoLevel);
                            children += battleCard.toRowHtml(maxNeeded, _this.count);
                        });
                    }
                    else if (this.isSandsOfTime) {
                        this.player
                            .activeBattleCards
                            .forEach(function (playerBattleCard) {
                            var maxNeeded = playerBattleCard.maxMaxSotNeeded;
                            children += playerBattleCard.toRowHtml(playerBattleCard.maxMaxSotNeeded, _this.count);
                        });
                    }
                    else {
                        var activeRecipes = this.player.activeRecipes, filtered = activeRecipes.filter(function (recipe) { var recipeItem = recipe.getItem(_this); return recipeItem && recipeItem.max != 0; });
                        filtered.forEach(function (recipe) {
                            var maxNeeded = recipe.getMaxNeeded(_this);
                            children += recipe.card.toRowHtml(maxNeeded, _this.count);
                        });
                    }
                }
                return "<div data-element-type=\"" + this.elementType + "\" data-rarity-type=\"" + this.rarityType + "\" data-item-type=\"" + this.itemType + "\" data-hud=\"" + this.isSandsOfTime + "\">" + renderExpandable(this.guid, image + " " + this.name + " " + badge, children) + "</div>";
            },
            enumerable: true,
            configurable: true
        });
        PlayerInventoryItem.toRowHtml = function (item, count, needed) {
            var folder = bh.ItemType[item.itemType].toLowerCase() + "s", name = item.isEvoJar ? item.name.replace(/\W/g, "") : item.isCrystal ? item.name.split(/ /)[0] : bh.data.HeroRepo.find(item.name.split("'")[0]).abilities[0].name.replace(/\W/g, ""), image = bh.getImg20(folder, name), color = count > needed ? "bg-success" : "bg-danger", badge = "<span class=\"badge pull-right " + color + "\">" + bh.utils.formatNumber(count) + " / " + bh.utils.formatNumber(needed) + "</span>";
            return "<div>" + image + " " + item.name + " " + badge + "</div>";
        };
        return PlayerInventoryItem;
    }());
    bh.PlayerInventoryItem = PlayerInventoryItem;
    function renderExpandable(guid, text, children) {
        if (!children)
            return "<div>" + text + "</div>";
        var expander = "<button class=\"bs-btn bs-btn-link bs-btn-xs brain-hud-button\" type=\"button\" data-action=\"toggle-child\" data-guid=\"" + guid + "\">[+]</button>", expandable = "<div class=\"brain-hud-child-scroller\" data-parent-guid=\"" + guid + "\">" + children + "</div>";
        return "<div>" + text + " " + expander + "</div>" + expandable;
    }
    bh.renderExpandable = renderExpandable;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var PlayerWildCard = (function () {
        function PlayerWildCard(player, guid) {
            this.player = player;
            this.type = "WildCard";
            this._ = bh.data.WildCardRepo.find(guid);
        }
        Object.defineProperty(PlayerWildCard.prototype, "count", {
            get: function () { return this.player._pp ? this.player._pp.wildcards[this.guid] || 0 : 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerWildCard.prototype, "guid", {
            get: function () { return this._.guid; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerWildCard.prototype, "html", {
            get: function () {
                var needed = this.needed, ofContent = needed ? " / " + bh.utils.formatNumber(needed) : "", css = needed ? this.count < needed ? "bg-danger" : "bg-success" : "", badge = "<span class=\"badge pull-right " + css + "\">" + this.count + ofContent + "</span>";
                return bh.getImg("cardtypes", "WildCard") + " " + this.name + " WC " + badge;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerWildCard.prototype, "name", {
            get: function () { return this._.name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerWildCard.prototype, "needed", {
            get: function () {
                var needed = 0;
                this.player
                    .filterActiveBattleCards(bh.RarityType[this.rarityType])
                    .forEach(function (playerBattleCard) { return needed += playerBattleCard.maxWildCardsNeeded; });
                return needed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerWildCard.prototype, "rarityType", {
            get: function () { return bh.RarityType[this._.name.replace(/ /g, "")]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerWildCard.prototype, "rowHtml", {
            get: function () {
                var _this = this;
                var html = this.html, expander = "", children = "";
                if (this.needed) {
                    expander = "<button class=\"bs-btn bs-btn-link bs-btn-xs brain-hud-button\" type=\"button\" data-action=\"toggle-child\" data-guid=\"" + this.guid + "\">[+]</button>";
                    children = "<div class=\"brain-hud-child-scroller\" data-parent-guid=\"" + this.guid + "\">";
                    this.player
                        .filterActiveBattleCards(bh.RarityType[this.rarityType])
                        .forEach(function (playerBattleCard) { return children += playerBattleCard.toRowHtml(playerBattleCard.maxWildCardsNeeded, _this.count); });
                    children += "</div>";
                }
                return "<div data-type=\"" + this.type + "\" data-rarity-type=\"" + this.rarityType + "\"><div>" + html + " " + expander + "</div>" + children + "</div>";
            },
            enumerable: true,
            configurable: true
        });
        return PlayerWildCard;
    }());
    bh.PlayerWildCard = PlayerWildCard;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var CardMultiplier = 2.5;
    var AbilityBlock = 5000, CardBlock = 5000;
    var RarityEvolutions = { Common: 1, Uncommon: 2, Rare: 3, SuperRare: 4, Legendary: 5 };
    var RarityLevels = { Common: 10, Uncommon: 20, Rare: 35, SuperRare: 50, Legendary: 50 };
    var RarityMultipliers = { Common: 10, Uncommon: 20, Rare: 35, SuperRare: 50, Legendary: 60 };
    var a1 = AbilityBlock * 0.40, a2 = AbilityBlock * 0.25, a3 = AbilityBlock * 0.20, a4 = AbilityBlock * 0.15;
    var b1 = a1 + a4 * 0.40, b2 = a2 + a4 * 0.25, b3 = a3 + a4 * 0.20, b4 = a4 * 0.15;
    var c1 = a1 + a4 * 0.45, c2 = a2 + a4 * 0.30, c3 = a3 + a4 * 0.25, c4 = 0;
    function calculateHeroAbilityScore(hero, ability) {
        switch (hero.name) {
            case "Bree": return ability == "HP" ? b2 : ability == "Trait" ? b1 : ability == "Active" ? b4 : b3;
            case "Brom": return ability == "HP" ? b2 : ability == "Trait" ? b1 : ability == "Active" ? b4 : b3;
            case "Fergus": return ability == "HP" ? a2 : ability == "Trait" ? a3 : ability == "Active" ? a4 : a1;
            case "Gilda": return ability == "HP" ? a4 : ability == "Trait" ? a2 : ability == "Active" ? a1 : a3;
            case "Hawkeye": return ability == "HP" ? a4 : ability == "Trait" ? a1 : ability == "Active" ? a3 : a2;
            case "Jinx": return ability == "HP" ? c3 : ability == "Trait" ? c1 : ability == "Active" ? c2 : c4;
            case "Krell": return ability == "HP" ? a3 : ability == "Trait" ? a1 : ability == "Active" ? a2 : a4;
            case "Logan": return ability == "HP" ? b3 : ability == "Trait" ? b2 : ability == "Active" ? b4 : b1;
            case "Monty": return ability == "HP" ? a4 : ability == "Trait" ? a1 : ability == "Active" ? a2 : a3;
            case "Peg": return ability == "HP" ? a4 : ability == "Trait" ? a1 : ability == "Active" ? a2 : a3;
            case "Red": return ability == "HP" ? a4 : ability == "Trait" ? a1 : ability == "Active" ? a3 : a2;
            case "Thrudd": return ability == "HP" ? b2 : ability == "Trait" ? b1 : ability == "Active" ? b4 : b3;
            case "Trix": return ability == "HP" ? a4 : ability == "Trait" ? a3 : ability == "Active" ? a1 : a2;
            default: return 0;
        }
    }
    function calculateCardScore(rarityType, evoLevel, level, multiplier) {
        return CardMultiplier * (evoLevel * RarityMultipliers[bh.RarityType[rarityType]] + level) * multiplier;
    }
    var PowerRating = (function () {
        function PowerRating() {
        }
        PowerRating.rateMaxedHero = function (hero) {
            var hp = calculateHeroAbilityScore(hero, "HP"), trait = calculateHeroAbilityScore(hero, "Trait"), active = calculateHeroAbilityScore(hero, "Active"), passive = calculateHeroAbilityScore(hero, "Passive"), deck = PowerRating.rateMaxedDeck(hero);
            return hp + trait + active + passive + deck;
        };
        PowerRating.rateMaxedDeck = function (hero) {
            var heroCards = bh.Hero.filterCardsByHero(hero, bh.data.cards.battle.getAll()), ratedCards = heroCards.map(function (card) { return { card: card, score: PowerRating.rateMaxedBattleCard(card) }; })
                .sort(function (a, b) { return a.score == b.score ? 0 : a.score < b.score ? 1 : -1; }), topCards = ratedCards.slice(0, 4), score = topCards.reduce(function (score, card) { return score + card.score * 2; }, 0);
            return score;
        };
        PowerRating.rateMaxedBattleCard = function (battleCard) {
            var key = bh.RarityType[battleCard.rarityType], evo = RarityEvolutions[key], level = RarityLevels[key];
            return PowerRating.ratePlayerCard({ configId: battleCard.guid, evolutionLevel: evo, level: level - 1 });
        };
        PowerRating.ratePlayerCard = function (playerCard) {
            var card = bh.data.cards.battle.find(playerCard.configId), multiplier = PowerRating.tierToMultiplier(card.tier), score = calculateCardScore(card.rarityType, playerCard.evolutionLevel, playerCard.level + 1, multiplier);
            return score;
        };
        PowerRating.ratePlayerHeroAbility = function (playerHeroAbility) {
            return calculateHeroAbilityScore(playerHeroAbility.hero, bh.AbilityType[playerHeroAbility.type]);
        };
        PowerRating.ratePlayerHeroHitPoints = function (playerHero) {
            return calculateHeroAbilityScore(playerHero.hero, "HP") * playerHero.level / bh.MaxLevel;
        };
        PowerRating.tierToMultiplier = function (tier) {
            return tier == "OP" ? 1.2 : tier == "S" ? 1 : tier == "A" ? 0.8 : tier == "B" ? 0.6 : tier == "C" ? 0.4 : tier == "D" ? 0.2 : 0.5;
        };
        return PowerRating;
    }());
    bh.PowerRating = PowerRating;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var Recipe = (function (_super) {
        __extends(Recipe, _super);
        function Recipe(card, partial) {
            if (partial === void 0) { partial = false; }
            var _this = _super.call(this) || this;
            _this.card = card;
            _this.evos = [];
            var matItems = (card.mats || "").split(",")
                .map(function (mat) { return bh.data.ItemRepo.find(mat.trim()); }).filter(function (item) { return !!item; })
                .sort(bh.utils.sort.byRarity);
            [0, 1, 2, 3, 4]
                .slice(0, card.rarityType + 1)
                .slice(partial ? card.evo : 0)
                .forEach(function (evoFrom) {
                var sands = bh.ItemRepo.sandsOfTime;
                _this.addItem(evoFrom, bh.data.getMinSotNeeded(card.rarityType, evoFrom), bh.data.getMaxSotNeeded(card.rarityType, evoFrom), sands.name);
                matItems.forEach(function (item) {
                    _this.addItem(evoFrom, 0, bh.data.getMaxMatNeeded(card.rarityType, evoFrom, item.rarityType), item.name);
                });
            });
            return _this;
        }
        Object.defineProperty(Recipe.prototype, "lower", {
            get: function () { return this.card.lower; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Recipe.prototype, "name", {
            get: function () { return this.card.name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Recipe.prototype, "rarityType", {
            get: function () { return this.card.rarityType; },
            enumerable: true,
            configurable: true
        });
        Recipe.prototype.addItem = function (evoFrom, min, max, itemName) {
            var evo = this.evos[evoFrom] || (this.evos[evoFrom] = { evoFrom: evoFrom, evoTo: evoFrom + 1, items: [] }), evoItem = { item: bh.data.ItemRepo.find(itemName), min: min, max: max };
            evo.items.push(evoItem);
        };
        Object.defineProperty(Recipe.prototype, "common", {
            get: function () {
                var _this = this;
                return this.fromCache("common", function () {
                    var recipeItem = _this.all.find(function (item) { return item.item.rarityType == bh.RarityType.Common; });
                    return recipeItem && recipeItem.item;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Recipe.prototype, "uncommon", {
            get: function () {
                var _this = this;
                return this.fromCache("uncommon", function () {
                    var recipeItem = _this.all.find(function (item) { return item.item.rarityType == bh.RarityType.Uncommon && item.item.name != "Sands of Time"; });
                    return recipeItem && recipeItem.item;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Recipe.prototype, "rare", {
            get: function () {
                var _this = this;
                return this.fromCache("rare", function () {
                    var recipeItem = _this.all.find(function (item) { return item.item.rarityType == bh.RarityType.Rare; });
                    return recipeItem && recipeItem.item;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Recipe.prototype, "superRare", {
            get: function () {
                var _this = this;
                return this.fromCache("superRare", function () {
                    var recipeItem = _this.all.find(function (item) { return item.item.rarityType == bh.RarityType.SuperRare; });
                    return recipeItem && recipeItem.item;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Recipe.prototype, "inventoryItems", {
            get: function () {
                return [this.common, this.uncommon, this.rare, this.superRare];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Recipe.prototype, "all", {
            get: function () {
                var _this = this;
                return this.fromCache("recipeItems", function () {
                    var items = [];
                    _this.evos.forEach(function (evo) {
                        evo.items.forEach(function (recipeItem) {
                            var item = items.find(function (item) { return item.item == recipeItem.item; });
                            if (!item) {
                                items.push(item = { item: recipeItem.item, min: 0, max: 0 });
                            }
                            item.min += recipeItem.min;
                            item.max += recipeItem.max;
                        });
                    });
                    return items;
                });
            },
            enumerable: true,
            configurable: true
        });
        Recipe.prototype.getItem = function (item) {
            return this.all.find(function (recipeItem) { return recipeItem.item.name == item.name; });
        };
        Recipe.prototype.getMaxNeeded = function (item) {
            var recipeItem = this.getItem(item), max = recipeItem && recipeItem.max, multiplier = this.card instanceof bh.PlayerBattleCard ? this.card.count : 1;
            return max * multiplier;
        };
        return Recipe;
    }(bh.Cacheable));
    bh.Recipe = Recipe;
})(bh || (bh = {}));
var bh;
(function (bh) {
    var data;
    (function (data) {
        var cards;
        (function (cards_1) {
            var battle;
            (function (battle) {
                var gid = 795369586;
                var _cards = [];
                function getAll() {
                    return _cards.slice();
                }
                battle.getAll = getAll;
                function getBrag() {
                    return _cards.filter(function (card) { return card.brag; });
                }
                battle.getBrag = getBrag;
                function find(guid) {
                    return _cards.find(function (card) { return card.guid == guid; });
                }
                battle.find = find;
                function findByName(name, rarityType) {
                    var lower = name.toLowerCase();
                    if (rarityType === undefined) {
                        return _cards.find(function (card) { return card.lower == lower; });
                    }
                    return _cards.find(function (card) { return card.rarityType === rarityType && card.lower == lower; });
                }
                battle.findByName = findByName;
                function getMaxEvo(rarityType) {
                    return rarityType + 1;
                }
                battle.getMaxEvo = getMaxEvo;
                function isMaxLevel(rarity, level) {
                    return level == [10, 20, 35, 50, 50][bh.RarityType[(rarity || "").replace(/ /, "")]];
                }
                battle.isMaxLevel = isMaxLevel;
                function calcDelta(base, max, rarityType) {
                    if (rarityType == bh.RarityType.Common) {
                        return (5 * max - 4 * base) / 81;
                    }
                    if (rarityType == bh.RarityType.Uncommon) {
                        return (100 * max - 68 * base) / 4807;
                    }
                    if (rarityType == bh.RarityType.Rare) {
                        return 625 * max / 68561 - 22 * base / 4033;
                    }
                    if (rarityType == bh.RarityType.SuperRare) {
                        return (12500 * max - 6732 * base) / 2391053;
                    }
                    if (rarityType == bh.RarityType.Legendary) {
                        return (12500 * max - 6732 * base) / 3003553;
                    }
                    return 0;
                }
                battle.calcDelta = calcDelta;
                function calcValue(base, max, rarityType, evo, level) {
                    var delta = calcDelta(base, max, rarityType), levels = rarityType == bh.RarityType.Common ? 9 : rarityType == bh.RarityType.Uncommon ? 19 : rarityType == bh.RarityType.Rare ? 34 : 49, value = base;
                    if (0 < evo) {
                        value = Math.floor((value + levels * delta) * 0.80);
                    }
                    if (1 < evo) {
                        value = Math.floor((value + levels * delta) * 0.85);
                    }
                    if (2 < evo) {
                        value = Math.floor((value + levels * delta) * 0.88);
                    }
                    if (3 < evo) {
                        value = Math.floor((value + levels * delta) * 0.90);
                    }
                    if (4 < evo) {
                        value = Math.floor((value + levels * delta) * 1.00);
                    }
                    value += level * delta;
                    return Math.floor(value);
                }
                battle.calcValue = calcValue;
                function calculateValue(playerCard) {
                    var card = find(playerCard.configId);
                    return !card || !card.base || !card.max ? 0 : calcValue(card.base, card.max, card.rarityType, playerCard.evolutionLevel, playerCard.level);
                }
                battle.calculateValue = calculateValue;
                var _init;
                function init() {
                    if (!_init) {
                        _init = new Promise(function (resolvefn) {
                            var tsv = (bh.TSV || {})[String(gid)];
                            if (tsv) {
                                resolvefn(parseTSV(tsv));
                            }
                            else {
                                bh.Repo.fetchTsv(null, gid).then(function (tsv) { return resolvefn(parseTSV(tsv)); }, function () { return resolvefn(_cards); });
                            }
                        });
                    }
                    return _init;
                }
                battle.init = init;
                function parseTSV(tsv) {
                    return _cards = bh.Repo.mapTsv(tsv);
                }
            })(battle = cards_1.battle || (cards_1.battle = {}));
        })(cards = data.cards || (data.cards = {}));
    })(data = bh.data || (bh.data = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    function getMaxLevel(fame) { return fame * 2; }
    bh.getMaxLevel = getMaxLevel;
    function getMaxTrait(level) { return Math.max(level - 1, 0); }
    bh.getMaxTrait = getMaxTrait;
    function getMaxActive(hero, level) { return hero.name == "Jinx" ? Math.max(level - 29, 0) : Math.max(level - 14, 0); }
    bh.getMaxActive = getMaxActive;
    function getMaxPassive(hero, level) { return hero.name == "Jinx" ? Math.max(level - 14, 0) : Math.max(level - 29, 0); }
    bh.getMaxPassive = getMaxPassive;
    function getAbilityLevelCap(playerHeroAbility) {
        switch (playerHeroAbility.type) {
            case bh.AbilityType.Active: return getMaxActive(playerHeroAbility.hero, playerHeroAbility.level);
            case bh.AbilityType.Passive: return getMaxPassive(playerHeroAbility.hero, playerHeroAbility.level);
            case bh.AbilityType.Trait: return getMaxTrait(playerHeroAbility.level);
        }
    }
    bh.getAbilityLevelCap = getAbilityLevelCap;
    function getAbilityLevelMax(playerHeroAbility) {
        switch (playerHeroAbility.type) {
            case bh.AbilityType.Active: return getMaxActive(playerHeroAbility.hero, bh.MaxLevel);
            case bh.AbilityType.Passive: return getMaxPassive(playerHeroAbility.hero, bh.MaxLevel);
            case bh.AbilityType.Trait: return getMaxTrait(bh.MaxLevel);
        }
    }
    bh.getAbilityLevelMax = getAbilityLevelMax;
    bh.MaxFame = 45;
    bh.MaxLevel = getMaxLevel(bh.MaxFame);
    function getAbilityMaxLevel(hero, abilityType) {
        switch (abilityType) {
            case bh.AbilityType.Active: return getMaxActive(hero, bh.MaxLevel);
            case bh.AbilityType.Passive: return getMaxPassive(hero, bh.MaxLevel);
            case bh.AbilityType.Trait: return getMaxTrait(bh.MaxLevel);
        }
    }
    bh.getAbilityMaxLevel = getAbilityMaxLevel;
    function isElement(element) { return String(element) in bh.ElementType; }
    bh.isElement = isElement;
    function isRarity(rarity) { return String(rarity).replace(/ /g, "") in bh.RarityType; }
    bh.isRarity = isRarity;
    var data;
    (function (data) {
        data.BoosterCardRepo = new bh.Repo(1709781959, true);
        data.HeroRepo = new bh.HeroRepo();
        data.ItemRepo = new bh.ItemRepo();
        data.PlayerRepo = new bh.Repo();
        data.WildCardRepo = new bh.Repo(2106503523, true);
        function arenaToPlayers(json) {
            var players = [];
            if (Array.isArray(json)) {
                if (json.length == 3) {
                    json.forEach(function (match) {
                        var indexKeys = Object.keys(match) || [], indexKey = indexKeys[0] || "0", playerContainer = match[indexKey], playerGuids = Object.keys(playerContainer) || [], playerGuid = playerGuids[0] || "", player = playerContainer[playerGuid] || null;
                        if (isPlayer(player))
                            players.push(player);
                    });
                }
            }
            return players;
        }
        data.arenaToPlayers = arenaToPlayers;
        function isGuildWar(json) {
            return json && json.guilds && json.currentWar && true;
        }
        data.isGuildWar = isGuildWar;
        function isGuild(json) {
            return json && json.playerGuild && json.members && true;
        }
        data.isGuild = isGuild;
        function isArena(json) {
            return arenaToPlayers(json).length && true;
        }
        data.isArena = isArena;
        function isPlayer(json) {
            return json && json.id && json.firstPlayedVersion && true;
        }
        data.isPlayer = isPlayer;
        function isGuildMembers(json) {
            return json && Array.isArray(json) && !json.map(isGuildPlayer).includes(false);
        }
        data.isGuildMembers = isGuildMembers;
        function isGuildPlayer(json) {
            return json && json.playerId && json.archetypeLevels && true || false;
        }
        data.isGuildPlayer = isGuildPlayer;
        var _init;
        function init() {
            if (!_init) {
                _init = Promise.all([data.cards.battle.init(), data.guilds.init()].concat(bh.Repo.init()));
            }
            return _init;
        }
        data.init = init;
    })(data = bh.data || (bh.data = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var data;
    (function (data) {
        function wildsForEvo(rarityType, currentEvoLevel) {
            return [[1], [1, 2], [1, 2, 4], [1, 2, 4, 5], [1, 2, 3, 4, 5]][rarityType || 0][currentEvoLevel || 0];
        }
        data.wildsForEvo = wildsForEvo;
        function getNextWildCardsNeeded(playerCard) {
            return wildsForEvo(playerCard.rarityType, playerCard.evo);
        }
        data.getNextWildCardsNeeded = getNextWildCardsNeeded;
        function getMaxWildCardsNeeded(playerCard) {
            var max = data.cards.battle.getMaxEvo(playerCard.rarityType), needed = 0;
            for (var evo = playerCard.evo; evo < max; evo++) {
                needed += wildsForEvo(playerCard.rarityType, evo);
            }
            return needed;
        }
        data.getMaxWildCardsNeeded = getMaxWildCardsNeeded;
        function getBaseGoldNeeded(rarityType, currentEvoLevel) {
            return [[1000], [3700, 11300], [4200, 19200, 49000], [25000, 44000, 70000, 155000], [45000, 90000, 180000, 360000, 540000]][rarityType][currentEvoLevel];
        }
        data.getBaseGoldNeeded = getBaseGoldNeeded;
        function getMinGoldNeeded(rarityType, currentEvoLevel) {
            var sands = bh.ItemRepo.sandsOfTime;
            return getBaseGoldNeeded(rarityType, currentEvoLevel) + getMinSotNeeded(rarityType, currentEvoLevel) * bh.ItemRepo.getValue(sands.itemType, sands.rarityType);
        }
        data.getMinGoldNeeded = getMinGoldNeeded;
        function getMaxGoldNeeded(rarityType, currentEvoLevel) {
            var base = getBaseGoldNeeded(rarityType, currentEvoLevel), sands = bh.ItemRepo.sandsOfTime, sotCosts = getMaxSotNeeded(rarityType, currentEvoLevel) * bh.ItemRepo.getValue(sands.itemType, sands.rarityType), matCounts = [0, 1, 2, 3].map(function (matRarityType) { return getMaxMatNeeded(rarityType, currentEvoLevel, matRarityType); }), matCosts = matCounts.map(function (count, rarityType) { return count * bh.ItemRepo.getValue(bh.ItemType.EvoJar, rarityType); }), matCostsSum = matCosts.reduce(function (sum, cost) { return sum + cost; }, 0), runeCosts = getMaxRunesNeeded(rarityType, currentEvoLevel) * bh.ItemRepo.getValue(bh.ItemType.Rune, bh.RarityType.Rare), crystalCosts = getMaxCrystalsNeeded(rarityType, currentEvoLevel) * bh.ItemRepo.getValue(bh.ItemType.Crystal, bh.RarityType.Uncommon);
            return base + sotCosts + matCostsSum + runeCosts + crystalCosts;
        }
        data.getMaxGoldNeeded = getMaxGoldNeeded;
        function calcMaxGoldNeeded(playerCard, evoAndLevel) {
            var needed = 0, rarityType = (data.cards.battle.find(playerCard.configId) || {}).rarityType || 0, evoCap = bh.data.cards.battle.getMaxEvo(rarityType);
            for (var i = +evoAndLevel.split(/\./)[0]; i < evoCap; i++) {
                needed += getMaxGoldNeeded(rarityType, i);
            }
            return needed;
        }
        data.calcMaxGoldNeeded = calcMaxGoldNeeded;
        function getMinSotNeeded(rarityType, currentEvoLevel) {
            return [[0], [2, 5], [5, 10, 20], [10, 20, 30, 40], [20, 30, 40, 60, 60]][rarityType || 0][currentEvoLevel || 0];
        }
        data.getMinSotNeeded = getMinSotNeeded;
        function getMaxSotNeeded(rarityType, currentEvoLevel) {
            return [[10], [12, 15], [15, 20, 30], [20, 30, 40, 60], [30, 40, 60, 80, 100]][rarityType || 0][currentEvoLevel || 0];
        }
        data.getMaxSotNeeded = getMaxSotNeeded;
        function calcMaxSotNeeded(playerCard, evoAndLevel) {
            var needed = 0, rarityType = (data.cards.battle.find(playerCard.configId) || {}).rarityType || 0, evoCap = bh.data.cards.battle.getMaxEvo(rarityType);
            for (var i = +evoAndLevel.split(/\./)[0]; i < evoCap; i++) {
                needed += getMaxSotNeeded(rarityType, i);
            }
            return needed;
        }
        data.calcMaxSotNeeded = calcMaxSotNeeded;
        function getMaxMatNeeded(cardRarityType, currentEvoLevel, matRarityType) {
            return ([
                [[12]],
                [[12, 2], [12, 6, 2]],
                [[14, 2], [26, 10, 4], [, 14, 8, 6]],
                [[26, 6, 2], [40, 20, 12], [, 26, 16, 8], [, 26, 20, 12]],
                [[40, 20, 12], [, 26, 16, 8], [, 30, 24, 12], [, 36, 30, 16]]
            ][cardRarityType][currentEvoLevel] || [])[matRarityType] || 0;
        }
        data.getMaxMatNeeded = getMaxMatNeeded;
        function getMinCrystalsNeeded(rarityType, currentEvoLevel) {
            return rarityType == bh.RarityType.Legendary && currentEvoLevel == 4 ? 30 : 0;
        }
        data.getMinCrystalsNeeded = getMinCrystalsNeeded;
        function getMaxCrystalsNeeded(rarityType, currentEvoLevel) {
            return rarityType == bh.RarityType.Legendary && currentEvoLevel == 4 ? 60 : 0;
        }
        data.getMaxCrystalsNeeded = getMaxCrystalsNeeded;
        function calcMaxCrystalsNeeded(playerCard, evoAndLevel) {
            var needed = 0, rarityType = (data.cards.battle.find(playerCard.configId) || {}).rarityType || 0, evoCap = bh.data.cards.battle.getMaxEvo(rarityType);
            for (var i = +evoAndLevel.split(/\./)[0]; i < evoCap; i++) {
                needed += data.getMaxCrystalsNeeded(rarityType, i);
            }
            return needed;
        }
        data.calcMaxCrystalsNeeded = calcMaxCrystalsNeeded;
        function getMinRunesNeeded(rarityType, currentEvoLevel) {
            return rarityType == bh.RarityType.Legendary && currentEvoLevel == 4 ? 30 : 0;
        }
        data.getMinRunesNeeded = getMinRunesNeeded;
        function getMaxRunesNeeded(rarityType, currentEvoLevel) {
            return rarityType == bh.RarityType.Legendary && currentEvoLevel == 4 ? 60 : 0;
        }
        data.getMaxRunesNeeded = getMaxRunesNeeded;
        function calcMaxRunesNeeded(playerCard, evoAndLevel) {
            var needed = 0, rarityType = (data.cards.battle.find(playerCard.configId) || {}).rarityType || 0, evoCap = bh.data.cards.battle.getMaxEvo(rarityType);
            for (var i = +evoAndLevel.split(/\./)[0]; i < evoCap; i++) {
                needed += data.getMaxRunesNeeded(rarityType, i);
            }
            return needed;
        }
        data.calcMaxRunesNeeded = calcMaxRunesNeeded;
    })(data = bh.data || (bh.data = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var data;
    (function (data) {
        var guilds;
        (function (guilds) {
            var gid = 496437953;
            var _names = [];
            var _guilds = [];
            function findByGuid(guid) {
                return _guilds.find(function (guild) { return guild && guild.playerGuild && guild.playerGuild.id == guid; });
            }
            guilds.findByGuid = findByGuid;
            function filterByName(value) {
                return filterNamesByName(value).map(function (name) { return findByGuid(name.guid); }).filter(function (guild) { return !!guild; });
            }
            guilds.filterByName = filterByName;
            function filterNamesByName(name) {
                var lower = (name || "").toLowerCase();
                return _names.filter(function (name) { return name.lower == lower; });
            }
            guilds.filterNamesByName = filterNamesByName;
            function filterNamesByParent(parent) {
                return parent && _names.filter(function (name) { return name.parent === parent; }) || [];
            }
            guilds.filterNamesByParent = filterNamesByParent;
            function findNameByGuid(guid) {
                return _names.filter(function (name) { return name.guid == guid; })[0] || null;
            }
            guilds.findNameByGuid = findNameByGuid;
            function getNames() { return _names.slice(); }
            guilds.getNames = getNames;
            function updateLeaderBoard(results) {
                if (results && results.leaderboardEntries) {
                    results.leaderboardEntries.forEach(function (entry) {
                        var name = findNameByGuid(entry.id);
                        if (!name) {
                            put(entry.id, entry.name);
                            name = findNameByGuid(entry.id);
                        }
                        name.leaderBoardEntry = entry;
                    });
                }
            }
            guilds.updateLeaderBoard = updateLeaderBoard;
            function put(guidOrGuild, name, parent) {
                if (name) {
                    var _name = _names.find(function (n) { return n.guid == guidOrGuild; });
                    if (_name) {
                        _name.lower = (name || "").toLowerCase();
                        _name.name = name || "";
                        _name.parent = _name.parent || parent || null;
                    }
                    else {
                        _names.push({
                            guid: guidOrGuild,
                            lower: (name || "").toLowerCase(),
                            name: name || null,
                            parent: parent || null
                        });
                    }
                }
                else {
                    if (Array.isArray(guidOrGuild)) {
                        var guid = guidOrGuild[0].guildId, guildName = findNameByGuid(guid), existing = guildName && findByGuid(guildName.guid);
                        if (existing) {
                            existing.playerGuild.members = guidOrGuild;
                        }
                        else {
                            _guilds.push({ playerGuild: { members: guidOrGuild, id: guid, name: guildName.name } });
                        }
                    }
                    else {
                        var playerGuild = guidOrGuild.playerGuild;
                        if (playerGuild) {
                            put(playerGuild.id, playerGuild.name);
                            var index = _guilds.findIndex(function (g) { return g.playerGuild.id == playerGuild.id; });
                            if (-1 < index) {
                                _guilds[index] = guidOrGuild;
                            }
                            else {
                                _guilds.push(guidOrGuild);
                            }
                            playerGuild.members.forEach(function (member) { return data.PlayerRepo.put(new bh.Player(member)); });
                        }
                    }
                }
            }
            guilds.put = put;
            var _init;
            function init() {
                if (!_init) {
                    _init = new Promise(function (resolvefn) {
                        var tsv = (bh.TSV || {})[String(gid)];
                        if (tsv) {
                            resolvefn(parseTSV(tsv));
                        }
                        else {
                            bh.Repo.fetchTsv(null, gid).then(function (tsv) { return resolvefn(parseTSV(tsv)); }, function () { return resolvefn(_names); });
                        }
                    });
                }
                return _init;
            }
            guilds.init = init;
            function parseTSV(tsv) {
                return _names = bh.Repo.mapTsv(tsv);
            }
        })(guilds = data.guilds || (data.guilds = {}));
    })(data = bh.data || (bh.data = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var data;
    (function (data) {
        var reports;
        (function (reports_1) {
            var reports = {};
            function getReport(guid) {
                var report = getGuildWarReport(guid);
                if (!report[guid])
                    report = getGuildReport(guid);
                if (!report[guid])
                    report = getGuildMembersReport(guid);
                if (!report[guid])
                    report = reports;
                return report;
            }
            reports_1.getReport = getReport;
            var guilds = {};
            function putGuild(guild) {
                if (!guild || !guild.playerGuild)
                    return {};
                guilds[guild.playerGuild.id] = guild;
                return getGuildReport(guild.playerGuild.id);
            }
            reports_1.putGuild = putGuild;
            function getGuildReport(guid) {
                return guilds[guid] ? guildMembersToReport(guilds[guid].members) || {} : {};
            }
            reports_1.getGuildReport = getGuildReport;
            var guildMembers = {};
            function putGuildMembers(members) {
                guildMembers[members[0].guildId] = members.slice();
                return getGuildMembersReport(members[0].guildId);
            }
            reports_1.putGuildMembers = putGuildMembers;
            function getGuildMembersReport(guid) {
                return guildMembers[guid] ? guildMembersToReport(guildMembers[guid]) || {} : {};
            }
            reports_1.getGuildMembersReport = getGuildMembersReport;
            var guildWars = {};
            function putGuildWar(war) {
                war.guilds.forEach(function (guild) { return guildWars[guild.id] = war; });
                return getGuildWarReport(war.guilds[0].id);
            }
            reports_1.putGuildWar = putGuildWar;
            function getGuildWarReport(guid) {
                return guildWars[guid] ? guildWarToReport(guildWars[guid]) || {} : {};
            }
            reports_1.getGuildWarReport = getGuildWarReport;
            function guildMembersToReport(members) {
                var heroes = data.HeroRepo.sorted, report = {}, guildGuid = members[0].guildId;
                report[guildGuid] = members.slice().sort(bh.utils.sort.byPositionThenName).map(mapMemberToOutput).join("\n");
                return report;
            }
            function mapMemberToOutput(member, index) {
                var player = data.PlayerRepo.find(member.playerId), role = bh.PositionType[member.position] + 1, fame = member.fameLevel + 1, heroData = data.HeroRepo.sorted.map(player ? mapPlayerHero : mapHero), position = index ? index + 1 : "GL";
                return [position, fame, member.name, role].concat(heroData).join("\t");
                function mapHero(hero) {
                    var level = member.archetypeLevels[hero.guid] + 1, hp = bh.utils.truncateNumber(hero.getHitPoints(level));
                    return level ? level + "|" + hp + "|" : "/|/|/";
                }
                function mapPlayerHero(hero) {
                    var playerHero = player.heroes.find(function (h) { return hero.guid == h.guid; }), level = playerHero ? playerHero.level : "/", hp = playerHero ? bh.utils.truncateNumber(playerHero.hitPoints) : "/", power = playerHero ? playerHero.powerPercent + "%" : "/";
                    return level + "|" + hp + "|" + power;
                }
            }
            function calculateBattleData(war, member) {
                var offensiveBattles = member ? war.currentWar.battles.filter(function (b) { return b.initiator.playerId == member.playerId; }) : [], offensiveWins = offensiveBattles.filter(function (b) { return b.initiator.winner; }), oBrags = offensiveWins.reduce(function (count, battle) { return count + (battle.completedBragId ? 1 : 0); }, 0), offensiveScore = offensiveWins.reduce(function (total, battle) { return total + battle.initiator.totalScore; }, 0), oCount = offensiveBattles.length, oWinCount = offensiveWins.length, oLossCount = oCount - oWinCount, defensiveBattles = member ? war.currentWar.battles.filter(function (b) { return b.opponent.playerId == member.playerId; }) : [], defensiveWins = defensiveBattles.filter(function (b) { return b.opponent.winner; }), dBrags = defensiveBattles.reduce(function (count, battle) { return count + (battle.completedBragId ? 1 : 0); }, 0), defensiveScore = defensiveBattles.reduce(function (total, battle) { return total + battle.opponent.totalScore; }, 0), dCount = defensiveBattles.length, dWinCount = defensiveWins.length, dLossCount = dCount - dWinCount, totalScore = offensiveScore + defensiveScore;
                return {
                    oCount: oCount,
                    oWinCount: oWinCount,
                    oLossCount: oLossCount,
                    dCount: dCount,
                    dWinCount: dWinCount,
                    dLossCount: dLossCount,
                    score: totalScore,
                    oBrags: oBrags,
                    tsv: [oCount, oWinCount, oBrags, oLossCount, dCount, dWinCount, dLossCount, totalScore].join("\t"),
                    legacyTsv: [oWinCount, oLossCount, dWinCount, totalScore].join("\t"),
                };
            }
            function guildWarToReport(war) {
                var heroes = data.HeroRepo.sorted, us = war.guilds[0], them = war.guilds.find(function (g) { return g.id != us.id; }), ourMembers = war.members[us.id].sort(bh.utils.sort.byPositionThenName), theirMembers = war.members[them.id].sort(bh.utils.sort.byPositionThenName), ourOutput = ourMembers.map(function (m, i) { return _mapMemberToOutput(i, m, theirMembers[i]); }).join("\n"), theirOutput = theirMembers.map(function (m, i) { return _mapMemberToOutput(i, m, ourMembers[i]); }).join("\n"), report = {}, legacy = true;
                report[us.id] = ourOutput;
                report[them.id] = theirOutput;
                return report;
                function _mapMemberToOutput(index, member, oppo) {
                    var memberTsv = mapMemberToOutput(member, index), battleData = calculateBattleData(war, member), oppoBattleData = calculateBattleData(war, oppo);
                    return memberTsv + "\t" + battleData.legacyTsv;
                }
            }
        })(reports = data.reports || (data.reports = {}));
    })(data = bh.data || (bh.data = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var _win, funcs = [], resolved = false, tries = 0, promise;
    function loaded(win) {
        _win = _win || win;
        return promise || (promise = new Promise(function (res, rej) {
            wait(res, rej);
            $(function () { res(); });
        }));
    }
    bh.loaded = loaded;
    function wait(res, rej) {
        if (resolved)
            return;
        if (++tries > 60) {
            return rej("60 tries");
        }
        if (!_win || !_win.jQuery || !_win.document || !_win.document.body) {
            if (!resolved)
                setTimeout(wait, 1500, res, rej);
            return;
        }
        _win.jQuery(function () {
            funcs.forEach(function (fn) { return fn(); });
        });
        res();
    }
    function jqFN() { return jqObj; }
    var jqObj = { on: jqFN, val: jqFN };
    function $(selector) {
        if (!selector)
            return _win ? _win.jQuery || jqFN : jqFN;
        if (typeof (selector) == "function" && !(_win && _win.jQuery))
            return funcs.push(selector);
        return (_win && _win.jQuery || jqFN)(selector);
    }
    bh.$ = $;
    var events;
    (function (events) {
        var heroStack = [];
        function init() {
            bh.data.init().then(function () {
                $("body").on("click change", "[data-action]", onAction);
            });
        }
        events.init = init;
        function toggle(key, value) {
            if (key && String(value).length) {
                $(".brain-hud-inventory-buttons > button[data-action=\"toggle-" + key + "\"][data-" + key + "=\"" + value + "\"]").toggleClass("active");
            }
            var elements = $(".brain-hud-inventory-buttons > [data-action=\"toggle-element\"].active").toArray().map(function (el) { return el.getAttribute("data-element"); }), klasses = $(".brain-hud-inventory-buttons > [data-action=\"toggle-klass\"].active").toArray().map(function (el) { return el.getAttribute("data-klass"); }), types = $(".brain-hud-inventory-buttons > [data-action=\"toggle-type\"].active").toArray().map(function (el) { return el.getAttribute("data-type"); });
            $("#brain-hud-inventory-items-container > div").hide();
            if (!elements.length && !klasses.length && !types.length) {
                $("#brain-hud-inventory-items-container > div[data-hud=\"true\"]").show();
            }
            else {
                $("#brain-hud-inventory-items-container > div").each(function (i, elem) {
                    var el = $(elem), element = !elements.length || elements.includes(String(el.data("elementType"))), klass = !klasses.length || klasses.includes(String(el.data("klassType"))) || klasses.includes(el.data("brag")), type = !types.length || types.includes(el.data("type")) || types.includes(String(el.data("itemType")));
                    if (element && klass && type) {
                        el.show();
                    }
                });
            }
        }
        events.toggle = toggle;
        function sortHeroes(playerGuid) {
            var container = $("div.brain-hud-scouter-player" + (playerGuid ? "[data-guid=\"" + playerGuid + "\"]" : ".active")), oldSort = container.data("sort"), newSort = !oldSort || oldSort == "element-klass" ? "power-asc" : "element-klass";
            container.data("sort", newSort);
            if (!playerGuid) {
                playerGuid = container.data("guid");
            }
            var player = bh.data.PlayerRepo.find(playerGuid), heroes = player.heroes.sort(function (a, b) {
                if (newSort == "power-asc") {
                    var aP = a.powerPercent, bP = b.powerPercent;
                    if (aP != bP)
                        return aP < bP ? -1 : 1;
                }
                return bh.utils.sort.byElementThenKlass(a, b);
            });
            heroes.forEach(function (hero) { return container.find("[data-guid=\"" + playerGuid + "-" + hero.guid + "\"]").appendTo(container); });
        }
        function onAction(ev) {
            var el = $(ev.target).closest("[data-action]"), action = el.data("action"), guid;
            switch (action) {
                case "sort-heroes":
                    sortHeroes();
                    break;
                case "refresh-guild":
                    bh.Messenger.instance.postMessage(bh.Messenger.createMessage("refresh-guild", $("#brain-hud-scouter-guild-target").val()));
                    break;
                case "refresh-player":
                    bh.Messenger.instance.postMessage(bh.Messenger.createMessage("refresh-player", $("#brain-hud-scouter-player-target").val()));
                    break;
                case "toggle-child":
                    guid = el.data("guid");
                    var active = $("div[data-parent-guid=\"" + guid + "\"]").toggleClass("active").hasClass("active");
                    $("button[data-action=\"toggle-child\"][data-guid=\"" + guid + "\"]").text(active ? "[-]" : "[+]");
                    break;
                case "toggle-element":
                    toggle("element", el.data("element"));
                    break;
                case "toggle-klass":
                    toggle("klass", el.data("klass"));
                    break;
                case "toggle-type":
                    toggle("type", el.data("type"));
                    break;
                case "toggle-scouter-guild":
                    bh.hud.guild.selectGuildReport();
                    break;
                case "toggle-scouter-player":
                    bh.hud.player.selectPlayerReport();
                    break;
                case "toggle-scouter-hero":
                    var panel = el.closest("[data-guid]"), content = panel.find(".brain-hud-scouter-panel-content");
                    content.toggleClass("active");
                    break;
                case "toggle-hud":
                    var visible = $("div.brain-hud-main-container").toggleClass("active").hasClass("active");
                    $("div#brain-hud-container").css("width", visible ? 250 : 25);
                    $("div.brain-hud-header>span.header")[visible ? "show" : "hide"]();
                    $("button.brain-hud-toggle[data-action=\"toggle-hud\"]").text(visible ? "[-]" : "[+]");
                    break;
                case "toggle-guild-scouter":
                    var visible = $("textarea#brain-hud-scouter-guild-report").toggleClass("active").hasClass("active");
                    $("button.brain-hud-toggle[data-action=\"toggle-guild-scouter\"]").text(visible ? "[-]" : "[+]");
                    break;
                case "toggle-player-scouter":
                    var visible = $("div#brain-hud-scouter-player-report").toggleClass("active").hasClass("active");
                    $("button.brain-hud-toggle[data-action=\"toggle-player-scouter\"]").text(visible ? "[-]" : "[+]");
                    break;
                case "toggle-inventory":
                    var visible = $("div.brain-hud-inventory-container").toggleClass("active").hasClass("active");
                    $("button.brain-hud-toggle[data-action=\"toggle-inventory\"]").text(visible ? "[-]" : "[+]");
                    break;
                default:
                    console.log(action);
                    break;
            }
        }
    })(events = bh.events || (bh.events = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var root;
    function getRoot() {
        if (!root) {
            root = String(location.href).toLowerCase().includes("battlehand-hud/") ? "." : bh.host;
        }
        return root;
    }
    function img(src, css, style) {
        var onerror = "", klass = css ? "class=\"" + css + "\"" : "", style = style ? "style=\"" + style + "\"" : "";
        if (src.includes("glyphicons-82-refresh")) {
            onerror = "onerror=\"bh.$(this).replaceWith('&#8634;')\"";
        }
        return "<img src=\"" + src + "\" " + klass + " " + style + " " + onerror + "/>";
    }
    function getImg() {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i] = arguments[_i];
        }
        return img(getSrc.apply(void 0, parts));
    }
    bh.getImg = getImg;
    function getImg12() {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i] = arguments[_i];
        }
        return img(getSrc.apply(void 0, parts), "icon-12");
    }
    bh.getImg12 = getImg12;
    function getImg20() {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i] = arguments[_i];
        }
        return img(getSrc.apply(void 0, parts), "icon-20");
    }
    bh.getImg20 = getImg20;
    function getImgG() {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i] = arguments[_i];
        }
        return img(getSrc.apply(void 0, parts), "grayscale");
    }
    bh.getImgG = getImgG;
    function getSrc() {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i] = arguments[_i];
        }
        var sliced = parts.slice(), image = images[sliced.shift()];
        while (sliced.length)
            image = image[sliced.shift()];
        if (!image)
            image = getRoot() + "/images/" + parts.join("/") + ".png";
        return image;
    }
    var images;
    (function (images) {
        var battlecards;
        (function (battlecards) {
            var icons;
            (function (icons) {
            })(icons = battlecards.icons || (battlecards.icons = {}));
        })(battlecards = images.battlecards || (images.battlecards = {}));
        var cardtypes;
        (function (cardtypes) {
        })(cardtypes = images.cardtypes || (images.cardtypes = {}));
        var classes;
        (function (classes) {
        })(classes = images.classes || (images.classes = {}));
        var crystals;
        (function (crystals) {
        })(crystals = images.crystals || (images.crystals = {}));
        var elements;
        (function (elements) {
        })(elements = images.elements || (images.elements = {}));
        var evojars;
        (function (evojars) {
        })(evojars = images.evojars || (images.evojars = {}));
        var heroes;
        (function (heroes) {
        })(heroes = images.heroes || (images.heroes = {}));
        var icons;
        (function (icons) {
        })(icons = images.icons || (images.icons = {}));
        var keys;
        (function (keys) {
        })(keys = images.keys || (images.keys = {}));
        var misc;
        (function (misc) {
        })(misc = images.misc || (images.misc = {}));
        var runes;
        (function (runes) {
        })(runes = images.runes || (images.runes = {}));
        var skills;
        (function (skills) {
        })(skills = images.skills || (images.skills = {}));
    })(images = bh.images || (bh.images = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    bh.isHud = false;
    bh.isListener = false;
    bh.isLocal = false;
    var hud;
    (function (hud) {
        var listener;
        (function (listener) {
            var resolution;
            (function (resolution) {
                var _win, _resolve, _hud = false, _listener = false, resolved = false;
                function setResolve(win, resolve) { _win = win; _resolve = resolve; }
                resolution.setResolve = setResolve;
                function resolveHud() { _hud = true; resolve(); }
                resolution.resolveHud = resolveHud;
                function resolveListener() { _listener = true; resolve(); }
                resolution.resolveListener = resolveListener;
                function resolve() { if (!resolved) {
                    if (_hud && _listener) {
                        _resolve(_win);
                        resolved = true;
                    }
                } }
            })(resolution || (resolution = {}));
            function handleMessage(message) {
                if (bh.Messenger.isValidMessage(message)) {
                    actionItems.forEach(function (item) {
                        if (item && item.action == message.action && item.callbackfn) {
                            try {
                                item.callbackfn(message);
                            }
                            catch (ex) {
                                console.error(message.action, ex);
                            }
                        }
                    });
                }
                else {
                    console.log("invalid message", message);
                }
            }
            ;
            var actionItems = [
                { action: "hud-init", url: null, callbackfn: resolution.resolveHud }
            ];
            function addAction(action, url, callbackfn) {
                actionItems.push({ action: action, url: url, callbackfn: callbackfn });
            }
            listener.addAction = addAction;
            function init(win, host) {
                if (host === void 0) { host = "http://brains.sth.ovh"; }
                return new Promise(function (res, rej) {
                    var href = String(win && win.location && win.location.href || "").toLowerCase();
                    bh.isLocal = href.includes("battlehand-hud/default.htm") || href.includes("battlehand-hud/iframe.htm");
                    bh.isHud = href.includes("battlehand-hud/default.htm") || href.startsWith("http://www.kongregate.com/games/anotherplaceprod/battlehand-web"),
                        bh.isListener = href.includes("battlehand-hud/iframe.htm") || href.startsWith("http://game261051.konggames.com/gamez/");
                    bh.host = host;
                    if (bh.isHud) {
                        win.bh = bh;
                        XmlHttpRequest.attach(win);
                        bh.loaded(win).then(function () {
                            bh.Messenger.initialize(win, handleMessage);
                            bh.data.init().then(function () {
                                hud.render();
                                bh.Messenger.instance.postMessage(bh.Messenger.createMessage("hud-init", "hud-init"));
                                res(win);
                            }, function () { return rej("data.init rejected"); });
                        }, function (reason) { return rej("loaded(win) rejected: " + reason); });
                    }
                    else if (bh.isListener) {
                        resolution.setResolve(win, res);
                        XmlHttpRequest.attach(win, readyStateChangeListener);
                        bh.Messenger.initialize(win, handleMessage);
                    }
                    else {
                        rej("not hud nor listener");
                    }
                });
            }
            listener.init = init;
            function readyStateChangeListener() { handleReadyStateChange(this); }
            function urlToAction(url) {
                var actionItem = actionItems.find(function (item) { return url.includes(item.url); });
                return actionItem && actionItem.action || null;
            }
            function handleReadyStateChange(xhr) {
                if (xhr.readyState == XmlHttpRequest.DONE) {
                    var match = xhr.requestUrl.match(/\?player=([a-z0-9]{8}(?:\-[a-z0-9]{4}){3}\-[a-z0-9]{12})&sessionKey=([a-z0-9]{32})(?:&guild(?:Id)?=([a-z0-9]{8}(?:\-[a-z0-9]{4}){3}\-[a-z0-9]{12}))?/);
                    if (match) {
                        var action = urlToAction(xhr.requestUrl), playerGuid = match[1], sessionKey = match[2], guildGuid = match[3], message = { action: action, playerGuid: playerGuid, sessionKey: sessionKey, guildGuid: guildGuid, data: xhr.responseJSON };
                        if (!action)
                            return;
                        resolution.resolveListener();
                        bh.Messenger.instance.postMessage(message);
                    }
                }
            }
            listener.handleReadyStateChange = handleReadyStateChange;
        })(listener = hud.listener || (hud.listener = {}));
    })(hud = bh.hud || (bh.hud = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var hud;
    (function (hud) {
        var arena;
        (function (arena) {
            function selectArenaMatches(message) {
                if (!bh.$("#brain-hud-scouter-player-target > option[value=\"arena\"]").length) {
                    bh.$("#brain-hud-scouter-player-target").children().first().after("<option value='arena'>Arena Opponents</option>");
                }
                var matches = message.data;
                var players = bh.data.arenaToPlayers(matches);
                players.forEach(function (player, i) { return hud.scouter.loadPlayer(new bh.Player(player, true), i); });
                bh.$("#brain-hud-scouter-player-target").val("arena");
                hud.player.selectPlayerReport();
            }
            hud.listener.addAction("get-arena-matches", "/v1/matchmaking/getmatches?", selectArenaMatches);
        })(arena = hud.arena || (hud.arena = {}));
    })(hud = bh.hud || (bh.hud = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var hud;
    (function (hud) {
        var guild;
        (function (guild_1) {
            function showContainer() {
                var container = bh.$("div.brain-hud-scouter-guild-container");
                if (!container.length) {
                    var textarea = bh.Player.me.canScout ? "<textarea id=\"brain-hud-scouter-guild-report\" rows=\"1\" type=\"text\" class=\"active\"></textarea>" : "";
                    bh.$("div.brain-hud-scouter-player-container").before("<div class=\"brain-hud-scouter-guild-container\"><button class=\"bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right\" data-action=\"toggle-guild-scouter\">[-]</button><button class=\"bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right\" data-action=\"refresh-guild\">" + bh.getImg12("icons", "glyphicons-82-refresh") + "</button><select id=\"brain-hud-scouter-guild-target\" data-action=\"toggle-scouter-guild\"></select>" + textarea + "</div>");
                }
                bh.$("div.brain-hud-scouter-guild-container").addClass("active");
            }
            function addGuild(message) {
                var guild = message.data, guid = guild && guild.playerGuild && guild.playerGuild.id, name = guild && guild.playerGuild && guild.playerGuild.name;
                if (guid && name) {
                    bh.data.guilds.put(guid, name);
                    bh.data.reports.putGuild(guild);
                    addGuildReport(guid);
                }
            }
            function addGuildSearchResults(message) {
                var results = message.data;
                results.forEach(function (guild) { return bh.data.guilds.put(guild.id, guild.name); });
            }
            function addGuildMembers(message) {
                var members = message.data, guid = members[0].guildId;
                bh.data.reports.putGuildMembers(members);
                addGuildReport(guid);
            }
            function addLeaderboardGuildMembers(message) {
                addGuildReport(message.guildGuid);
            }
            function addGuildWar(message) {
                var war = message.data;
                if (war && war.guilds) {
                    war.guilds.forEach(function (guild) { return bh.data.guilds.put(guild.id, guild.name); });
                    bh.data.reports.putGuildWar(war);
                    war.guilds.forEach(function (guild) { return addGuildReport(guild.id); });
                }
            }
            function addGuildLeaderBoard(message) {
                var results = message.data;
                bh.data.guilds.updateLeaderBoard(results);
                updateGuildOptions();
            }
            function addGuildReport(guid) {
                var guildName = bh.data.guilds.findNameByGuid(guid);
                if (!guildName)
                    return console.log("guildName not found: " + guid);
                var player = bh.Player.me, playerGuildParent = player && player.guildParent || null, guilds = playerGuildParent && bh.data.guilds.filterNamesByParent(playerGuildParent) || [], canScout = player && player.canScout, isGuild = player && player.guildGuid == guid;
                if (!guilds.find(function (g) { return g.guid == guid; }) && !canScout && !isGuild)
                    return;
                showContainer();
                var select = bh.$("#brain-hud-scouter-guild-target");
                if (!select.find("option[value=\"" + guid + "\"]").length) {
                    select.append("<option value=\"" + guid + "\">" + guildName.name + "</option>");
                    select.children().toArray().filter(function (opt) { return opt.value != player.guildGuid; })
                        .sort(function (a, b) { return a.text < b.text ? -1 : a.text == b.text ? 0 : 1; })
                        .forEach(function (el) { return select.append(el); });
                }
                select.val(guid);
                selectGuildReport();
            }
            guild_1.addGuildReport = addGuildReport;
            function updateGuildOptions() {
                bh.$("#brain-hud-scouter-guild-target").children().toArray().forEach(updateGuildOption);
            }
            function updateGuildOption(opt) {
                if (!opt || !opt.value)
                    return;
                var guid = opt.value, guildName = bh.data.guilds.findNameByGuid(guid), leaderBoardEntry = guildName && guildName.leaderBoardEntry || null, rankText = leaderBoardEntry && "#" + (leaderBoardEntry.rank + 1) + " " || "", winLossText = leaderBoardEntry && (leaderBoardEntry.wins || leaderBoardEntry.losses) && "(" + guildName.leaderBoardEntry.wins + "/" + guildName.leaderBoardEntry.losses + ") " || "", text = "" + rankText + winLossText + guildName.name;
                opt.text = text;
            }
            function selectGuildReport() {
                var guid = bh.$("#brain-hud-scouter-guild-target").val();
                updateGuildOption(bh.$("#brain-hud-scouter-guild-target > option[value=\"" + guid + "\"]")[0]);
                bh.$("#brain-hud-scouter-guild-report").val(bh.data.reports.getReport(guid)[guid] || "");
            }
            guild_1.selectGuildReport = selectGuildReport;
            hud.listener.addAction("get-guild", "/v1/guild/get?", addGuild);
            hud.listener.addAction("get-guild-members", "/v1/guild/getmembers?", addGuildMembers);
            hud.listener.addAction("get-guild-war", "/v1/guildwars/get?", addGuildWar);
            hud.listener.addAction("get-leaderboard", "/v1/guildwars/getrange?", addGuildLeaderBoard);
            hud.listener.addAction("get-guildsearch", "/v1/guild/getguilds?", addGuildSearchResults);
            hud.listener.addAction("get-leaderboard-members", "/v1/guildwars/getguildmembersrange?", addLeaderboardGuildMembers);
            function searchGuilds(filter, deep) {
                var url = "https://battlehand-game-kong.anotherplacegames.com/v1/guild/getguilds?player=" + bh.Messenger.ActivePlayerGuid + "&sessionKey=" + bh.Messenger.ActiveSessionKey + "&name=" + filter + "&joinableonly=False&language=&minfamelevel=2&maxfamelevel=44";
                return new Promise(function (res, rej) {
                    if (!bh.Messenger.ActivePlayerGuid || !bh.Messenger.ActiveSessionKey)
                        return rej("not initialized");
                    XmlHttpRequest.getJSON(url).then(function (json) {
                        if (!json || !Array.isArray(json))
                            return rej("invalid json");
                        guildsGetMembers(json, deep).then(res, rej);
                    }, rej);
                });
            }
            guild_1.searchGuilds = searchGuilds;
            function guildsGetMembers(guilds, deep) {
                return new Promise(function (res, rej) {
                    var _guilds = guilds.slice(), guild;
                    function fetch() {
                        if (guild = _guilds.shift()) {
                            setTimeout(function () { return guildGetMembers(guild.id, deep).then(fetch, fetch); }, hud._delayMS);
                        }
                        else {
                            res();
                        }
                    }
                    fetch();
                });
            }
            guild_1.guildsGetMembers = guildsGetMembers;
            function guildGetMembers(guid, deep) {
                var url = "https://battlehand-game-kong.anotherplacegames.com/v1/guild/getmembers?player=" + bh.Messenger.ActivePlayerGuid + "&sessionKey=" + bh.Messenger.ActiveSessionKey + "&guild=" + guid;
                if (bh.isLocal)
                    url = "./json/" + guid + ".json";
                return new Promise(function (res, rej) {
                    if (!bh.Messenger.ActivePlayerGuid || !bh.Messenger.ActiveSessionKey)
                        return rej("not initialized");
                    if (!guid)
                        return rej("no guild id");
                    XmlHttpRequest.getJSON(url).then(function (json) {
                        if (!json || !Array.isArray(json))
                            return rej("invalid json");
                        bh.Messenger.instance.postMessage(bh.Messenger.createMessage("get-guild-members", json));
                        if (deep) {
                            var memberGuids = json.map(function (member) { return member.playerId; });
                            hud.player.playersGet(memberGuids).then(res, res);
                        }
                        else {
                            res(json);
                        }
                    }, rej);
                });
            }
            guild_1.guildGetMembers = guildGetMembers;
            function leaderBoardGet(start, count) {
                if (start === void 0) { start = 0; }
                if (count === void 0) { count = 13; }
                var url = "https://battlehand-game-kong.anotherplacegames.com/v1/guildwars/getrange?player=" + bh.Messenger.ActivePlayerGuid + "&sessionKey=" + bh.Messenger.ActiveSessionKey + "&start=" + start + "&count=" + count;
                if (bh.isLocal)
                    url = "./json/top_guilds.json";
                return new Promise(function (res, rej) {
                    if (!bh.Messenger.ActivePlayerGuid || !bh.Messenger.ActiveSessionKey)
                        return rej("not initialized");
                    XmlHttpRequest.getJSON(url).then(function (json) {
                        if (!json || !json.leaderboardEntries)
                            return rej("invalid json");
                        bh.Messenger.instance.postMessage(bh.Messenger.createMessage("get-leaderboard", json));
                        res(json);
                    }, rej);
                });
            }
            guild_1.leaderBoardGet = leaderBoardGet;
            hud.listener.addAction("refresh-guild", null, function (message) {
                guildGetMembers(message.data, true);
            });
        })(guild = hud.guild || (hud.guild = {}));
    })(hud = bh.hud || (bh.hud = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var hud;
    (function (hud) {
        hud._delayMS = 500;
        var player;
        (function (player_1) {
            function loadPlayer(player) {
                if (player.isExtended) {
                    bh.$("#brain-hud-inventory").addClass("active");
                    bh.data.PlayerRepo.put(player);
                    bh.$("#brain-hud-inventory-items-container")
                        .html("")
                        .append(player.boosterCards.map(function (card) { return card.rowHtml; }))
                        .append(player.battleCards.map(function (card) { return card.rowHtml; }))
                        .append(player.inventory.sort(bh.utils.sort.byName).map(function (item) { return item.rowHtml; }))
                        .append(player.wildCards.map(function (card) { return card.rowHtml; }))
                        .append(player.boosterRowHtml)
                        .append(player.fragmentsRowHtml)
                        .append(player.gemsRowHtml)
                        .append(player.goldRowHtml)
                        .append(player.raidRowHtml)
                        .append(player.wildCardRowHtml);
                    bh.events.toggle();
                }
            }
            player_1.loadPlayer = loadPlayer;
            function addPlayerReport(message) {
                var json = message.data;
                var player = new bh.Player(json), select = bh.$("#brain-hud-scouter-player-target");
                if (!bh.$("#brain-hud-scouter-player-target > option[value=\"" + player.guid + "\"]").length) {
                    select.append("<option value=\"" + player.guid + "\">" + (player.isFullMeat ? "&#9734; " : "") + bh.utils.htmlFriendly(player.name) + " (" + player.powerPercent + "%)</option>");
                    select.children().toArray().slice(1)
                        .sort(function (a, b) { return a.text < b.text ? -1 : a.text == b.text ? 0 : 1; })
                        .forEach(function (el) { return select.append(el); });
                }
                bh.data.PlayerRepo.put(player);
                hud.scouter.loadPlayer(player);
                if (player.isMe) {
                    loadPlayer(player);
                    var guilds = player.guilds;
                    if (guilds.length && hud.guild.addGuildReport) {
                        guilds.forEach(function (g) { return hud.guild.addGuildReport(g.guid); });
                    }
                }
                select.val(json.id);
                selectPlayerReport();
                hud.guild.selectGuildReport();
            }
            player_1.addPlayerReport = addPlayerReport;
            function selectPlayerReport() {
                bh.$("div.brain-hud-scouter-player-container").addClass("active");
                bh.$("#brain-hud-scouter-player-report").show();
                bh.$("div.brain-hud-scouter-player").removeClass("active");
                var guid = bh.$("#brain-hud-scouter-player-target").val();
                if (guid == "arena") {
                    bh.$("div.brain-hud-scouter-player[data-guid=\"arena-0\"]").addClass("active");
                    bh.$("div.brain-hud-scouter-player[data-guid=\"arena-1\"]").addClass("active");
                    bh.$("div.brain-hud-scouter-player[data-guid=\"arena-2\"]").addClass("active");
                }
                else {
                    bh.$("div.brain-hud-scouter-player[data-guid=\"" + guid + "\"]").addClass("active");
                }
            }
            player_1.selectPlayerReport = selectPlayerReport;
            hud.listener.addAction("get-player", "/v1/player/get?", addPlayerReport);
            hud.listener.addAction("get-player", "/v1/player/getplayerinfo?", addPlayerReport);
            function playersGet(playerGuids) {
                return new Promise(function (res, rej) {
                    var guids = playerGuids.slice(), guid;
                    function fetch() {
                        if (guid = guids.shift()) {
                            setTimeout(function () { return playerGet(guid).then(fetch, fetch); }, hud._delayMS);
                        }
                        else {
                            res();
                        }
                    }
                    fetch();
                });
            }
            player_1.playersGet = playersGet;
            function playerGet(guid) {
                var url = "https://battlehand-game-kong.anotherplacegames.com/v1/player/getplayerinfo?player=" + bh.Messenger.ActivePlayerGuid + "&sessionKey=" + bh.Messenger.ActiveSessionKey + "&id_requested_player=" + guid;
                if (bh.isLocal)
                    url = "./json/" + guid + ".json";
                return new Promise(function (res, rej) {
                    if (!bh.Messenger.ActivePlayerGuid || !bh.Messenger.ActiveSessionKey)
                        return rej("not initialized");
                    if (!guid)
                        return rej("no player id");
                    XmlHttpRequest.getJSON(url).then(function (json) {
                        if (!json)
                            return rej("invalid json");
                        bh.Messenger.instance.postMessage(bh.Messenger.createMessage("get-player", json));
                        res(json);
                    }, rej);
                });
            }
            player_1.playerGet = playerGet;
            hud.listener.addAction("refresh-player", null, function (message) { console.log("refresh-player: " + (message && message.data)); playerGet(message.data); });
        })(player = hud.player || (hud.player = {}));
    })(hud = bh.hud || (bh.hud = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var hud;
    (function (hud) {
        function render() {
            renderBootstrapCss();
            renderHtml();
            bh.events.init();
        }
        hud.render = render;
        function renderCss() {
            var css = "<style id=\"brain-hud-styles\" type=\"text/css\">\ndiv.brain-hud-container { font-size:8pt; position:fixed; top:0; right:0; width:250px; background:#FFF; color:#000; border:2px solid #000; z-index:9999; padding:2px; max-height:" + (jQuery(window).height() - 10) + "px; overflow:auto; }\ndiv.brain-hud-container div { clear:both; }\ndiv.brain-hud-container table { width:100%; margin:0; padding:0; border:0; }\ndiv.brain-hud-container td { padding:0; margin:0; border:0; }\ndiv.brain-hud-container select { width:180px; }\ndiv.brain-hud-container textarea { width:240px; font-size:8pt; display:none; }\n\ndiv.brain-hud-container .Air { background-color:#f3f3f3; }\ndiv.brain-hud-container .Earth { background-color:#e0eed5; }\ndiv.brain-hud-container .Fire { background-color:#fce5cd; }\ndiv.brain-hud-container .Spirit { background-color:#f3e2f6; }\ndiv.brain-hud-container .Water { background-color:#deeaf4; }\ndiv.brain-hud-container .grayscale { filter: grayscale(100%); }\n\ndiv.brain-hud-header { text-align:center; font-weight:bold; }\n\ndiv.brain-hud-main-container,\ndiv.brain-hud-scouter-guild-container,\ndiv.brain-hud-scouter-player-container,\ndiv.brain-hud-scouter-player,\ndiv.brain-hud-scouter-panel-content,\ndiv.brain-hud-inventory,\ndiv.brain-hud-inventory-container,\ndiv.brain-hud-child-scroller { display:none; }\n\ndiv.brain-hud-scouter-panel-content,\ndiv.brain-hud-child-scroller { padding-left:10px; }\n\ndiv.brain-hud-scouter-player-report { display:none; padding:0 2px; text-align:left; }\ndiv.brain-hud-scouter-player > div.player-name { font-size:10pt; font-weight:bold; text-align:center; }\n\ndiv.brain-hud-scouter-panel-header { padding:2px 0 0 0; }\ndiv.brain-hud-scouter-panel-header > button { cursor:default; border:0; width:240px; text-align:left; padding:0; margin:0; }\ndiv.brain-hud-scouter-panel-header > button[data-action] { cursor:pointer; }\ndiv.brain-hud-scouter-panel-header > button > span.hero-icon { display:inline-block; width:20px; text-align:center; }\ndiv.brain-hud-scouter-panel-header > button > span.hero-level { display:inline-block; width:30px; text-align:right; }\ndiv.brain-hud-scouter-panel-header > button > span.hero-name { display:inline-block; width:60px; }\ndiv.brain-hud-scouter-panel-header > button > span.hero-hp { display:inline-block; width:50px; text-align:center; }\ndiv.brain-hud-scouter-panel-header > button > span.hero-rating { display:inline-block; width:70px; }\n\ndiv.brain-hud-inventory-buttons { text-align:center; }\n\ndiv.brain-hud-container .active { display:block; }\n\ndiv.brain-hud-container .star { color: darkgoldenrod; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; }\ndiv.brain-hud-container .evo-star { color: gold; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; }\n\ndiv.brain-hud-container img { height:16px; width:16px; }\ndiv.brain-hud-container img.icon-12 { height:12px; width:12px; }\ndiv.brain-hud-container img.icon-20 { height:20px; width:20px; }\n\ndiv.brain-hud-child-scroller { max-height:180px; overflow:auto; }\ndiv.brain-hud-scouter-panel-content.active,\ndiv.brain-hud-child-scroller.active { border:1px solid #aaa; border-radius:10px; }\n\ndiv.progress { margin-bottom:0; height:10px; }\ndiv.progress > div.progress-bar { line-height:10px; font-size:8px; font-weight:bold; clear:none; }\n\ndiv.brain-hud-container .badge,\ndiv.brain-hud-container .bs-btn-group-xs > .bs-btn,\ndiv.brain-hud-container .bs-btn-xs { font-size:11px; }\n\ndiv.brain-hud-container .badge.bg-success { background-color:#3c763d; }\ndiv.brain-hud-container .badge.bg-danger { background-color:#a94442; }\ndiv.brain-hud-container [data-action=\"sort-heroes\"] { cursor:pointer; }\n</style>";
            bh.$("head").append(css);
        }
        function renderBootstrapCss() {
            bh.$().get("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css").then(function (css) {
                bh.$("head").append("<style type=\"text/css\">" + css.replace(/\.btn/g, ".bs-btn") + "</style>");
                renderCss();
            });
        }
        function inventoryButton(type, typeValue, imgType, imgName) {
            return "<button class=\"bs-btn bs-btn-default brain-hud-button\" type=\"button\" data-action=\"toggle-" + type + "\" data-" + type + "=\"" + typeValue + "\">" + bh.getImg(imgType, imgName || typeValue) + "</button>";
        }
        function renderHtml() {
            var html = "<div class=\"brain-hud-header\">\n\t<button class=\"bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right\" data-action=\"toggle-hud\">[-]</button>\n\t<span class=\"header\">The Brain BattleHand HUD</span>\n</div>\n<div class=\"brain-hud-main-container active\">\n\t<div class=\"brain-hud-scouter-player-container\">\n\t\t<button class=\"bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right\" data-action=\"toggle-player-scouter\">[-]</button>\n\t\t<button class=\"bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right\" data-action=\"refresh-player\">" + bh.getImg12("icons", "glyphicons-82-refresh") + "</button>\n\t\t<select id=\"brain-hud-scouter-player-target\" data-action=\"toggle-scouter-player\"></select>\n\t\t<div id=\"brain-hud-scouter-player-report\" class=\"brain-hud-scouter-player-report active\"></div>\n\t</div>\n\t<div id=\"brain-hud-inventory\" class=\"brain-hud-inventory\">\n\t\t<strong>Inventory</strong>\n\t\t<button class=\"bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right\" data-action=\"toggle-inventory\">[-]</button>\n\t\t<div class=\"brain-hud-inventory-container active\">\n\t\t\t<div class=\"text-center\">\n\t\t\t\t<div class=\"bs-btn-group bs-btn-group-xs brain-hud-inventory-buttons\" role=\"group\">\n\t\t\t\t\t" + inventoryButton("element", bh.ElementType.Air, "elements", "Air") + "\n\t\t\t\t\t" + inventoryButton("element", bh.ElementType.Earth, "elements", "Earth") + "\n\t\t\t\t\t" + inventoryButton("element", bh.ElementType.Fire, "elements", "Fire") + "\n\t\t\t\t\t" + inventoryButton("element", bh.ElementType.Spirit, "elements", "Spirit") + "\n\t\t\t\t\t" + inventoryButton("element", bh.ElementType.Water, "elements", "Water") + "\n\t\t\t\t\t" + inventoryButton("element", bh.ElementType.Neutral, "elements", "Loop") + "\n\t\t\t\t</div>\n\t\t\t\t<div class=\"bs-btn-group bs-btn-group-xs brain-hud-inventory-buttons\">\n\t\t\t\t\t" + inventoryButton("klass", bh.KlassType.Magic, "classes", "Magic") + "\n\t\t\t\t\t" + inventoryButton("klass", bh.KlassType.Might, "classes", "Might") + "\n\t\t\t\t\t" + inventoryButton("klass", bh.KlassType.Skill, "classes", "Skill") + "\n\t\t\t\t\t" + inventoryButton("klass", "Brag", "cardtypes") + "\n\t\t\t\t\t" + inventoryButton("type", bh.ItemType.Rune, "runes", "Meteor") + "\n\t\t\t\t\t" + inventoryButton("type", bh.ItemType.Crystal, "crystals", "Neutral") + "\n\t\t\t\t</div>\n\t\t\t\t<div class=\"bs-btn-group bs-btn-group-xs brain-hud-inventory-buttons\">\n\t\t\t\t\t" + inventoryButton("type", "BoosterCard", "misc", "Boosters") + "\n\t\t\t\t\t" + inventoryButton("type", "WildCard", "cardtypes", "WildCard") + "\n\t\t\t\t\t" + inventoryButton("type", bh.ItemType.EvoJar, "misc", "EvoJars") + "\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id=\"brain-hud-inventory-items-container\" class=\"brain-hud-inventory-items-container\"></div>\n\t\t</div>\n\t</div>\n</div>";
            bh.$("body").append("<div id=\"brain-hud-container\" class=\"brain-hud-container\">" + html + "</div>");
        }
    })(hud = bh.hud || (bh.hud = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var hud;
    (function (hud) {
        var scouter;
        (function (scouter) {
            function getOrCreateContainer(guid) {
                if (!bh.$("div.brain-hud-scouter-player[data-guid=\"" + guid + "\"]").length) {
                    bh.$("div#brain-hud-scouter-player-report").append("<div class=\"brain-hud-scouter-player\" data-guid=\"" + guid + "\"></div>");
                }
                return bh.$("div.brain-hud-scouter-player[data-guid=\"" + guid + "\"]");
            }
            function loadPlayers(arenaPlayers) {
                arenaPlayers.forEach(function (arenaPlayer, arenaIndex) {
                    var indexKey = Object.keys(arenaPlayer)[0], indexPlayer = arenaPlayer[indexKey], guid = Object.keys(indexPlayer)[0], player = indexPlayer[guid];
                    loadPlayer(new bh.Player(player, true), arenaIndex);
                });
            }
            function loadPlayer(player, arenaIndex) {
                if (arenaIndex === void 0) { arenaIndex = -1; }
                var star = player.isFullMeat ? "&#9734;" : "", averagePercentText = player.powerPercent == player.averagePowerPercent ? "" : "; Avg " + player.averagePowerPercent + "%", percentText = player.isArena ? "" : " <span style=\"white-space:nowrap;\">(" + player.powerPercent + "%" + averagePercentText + ")</span>", html = "<div class=\"player-name\" data-action=\"sort-heroes\">" + star + " " + bh.utils.htmlFriendly(player.name) + " " + percentText + "</div>", playerHeroes = player.heroes.sort(bh.utils.sort.byElementThenKlass);
                playerHeroes.forEach(function (hero) {
                    var id = player.guid + "-" + hero.guid, icon = bh.getImg("heroes", hero.name), level = hero.level == bh.MaxLevel ? hero.isMeat ? "<span class=\"evo-star\">&#9734;</span>" : "<span class=\"star\">&#9734;</span>" : "(" + hero.level + ")", powerPercent = hero.powerPercent, progressBG = hero.isOp ? "background-color:pink;" : "", color = powerPercent < 25 ? "progress-bar-info" : powerPercent < 50 ? "progress-bar-success" : powerPercent < 75 ? "progress-bar-warning" : "progress-bar-danger", progressBar = "<div class=\"progress\" style=\"" + progressBG + "\"><div class=\"progress-bar " + color + "\" style=\"width:" + powerPercent + "%;\"><span>" + powerPercent + "%</span></div></div>", title = "<span class=\"hero-icon\">" + icon + "</span><span class=\"hero-name\">" + hero.name + "</span><span class=\"hero-level\">" + level + "</span><span class=\"hero-hp\">" + bh.utils.truncateNumber(hero.hitPoints) + " HP</span><span class=\"hero-rating\">" + progressBar + "</span>", content = "";
                    if (player.isMe || player.isAlly) {
                        var abilities = hero.playerHeroAbilities
                            .map(function (playerHeroAbility) {
                            var level = playerHeroAbility.level, isCapped = playerHeroAbility.isCapped, isLocked = playerHeroAbility.isLocked, isMaxed = playerHeroAbility.isMaxed, maxLevel = playerHeroAbility.levelMax, levelText = isLocked ? "locked" : isMaxed ? "max" : isCapped ? "capped" : level + " / " + maxLevel, text = playerHeroAbility.img + " " + playerHeroAbility.name + " (" + levelText + ")", children = "";
                            if (!isMaxed) {
                                children += playerHeroAbility.materialHtml;
                                children += playerHeroAbility.goldHtml;
                            }
                            return bh.renderExpandable(hero.guid + playerHeroAbility.guid, text, children);
                        }), cardsHtml = hero.deck.map(function (card) { return card.rowHtml; }).join("");
                        content = "" + abilities.join("") + cardsHtml;
                    }
                    html += buildPanel(id, hero.elementType, title, content, player.isMe || player.isAlly);
                });
                getOrCreateContainer(arenaIndex == -1 ? player.guid : "arena-" + arenaIndex).html(html);
            }
            scouter.loadPlayer = loadPlayer;
            function buildPanel(id, elementType, title, html, isMe) {
                var header = "<button class=\"bs-btn bs-btn-link bs-btn-sm " + bh.ElementType[elementType] + "\" " + (isMe ? "data-action=\"toggle-scouter-hero\"" : "") + ">" + title + "</button>";
                return "<div class=\"brain-hud-scouter-panel\" data-guid=\"" + id + "\"><div class=\"brain-hud-scouter-panel-header\">" + header + "</div><div class=\"brain-hud-scouter-panel-content\">" + html + "</div></div>";
            }
        })(scouter = hud.scouter || (hud.scouter = {}));
    })(hud = bh.hud || (bh.hud = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var utils;
    (function (utils) {
        var sort;
        (function (sort) {
            function byElement(a, b) {
                return a.elementType == b.elementType ? 0 : a.elementType < b.elementType ? -1 : 1;
            }
            sort.byElement = byElement;
            function byElementThenKlass(a, b) {
                return byElement(a, b) || byKlass(a, b);
            }
            sort.byElementThenKlass = byElementThenKlass;
            function byElementThenName(a, b) {
                return byElement(a, b) || byName(a, b);
            }
            sort.byElementThenName = byElementThenName;
            function byElementThenRarityThenName(a, b) {
                return byElement(a, b) || byRarityThenName(a, b);
            }
            sort.byElementThenRarityThenName = byElementThenRarityThenName;
            function byKlass(a, b) {
                return a.klassType == b.klassType ? 0 : a.klassType < b.klassType ? -1 : 1;
            }
            sort.byKlass = byKlass;
            function byEvoLevel(a, b) {
                return a.evoLevel == b.evoLevel ? 0 : +a.evoLevel < +b.evoLevel ? -1 : 1;
            }
            sort.byEvoLevel = byEvoLevel;
            function byEvoLevelThenName(a, b) {
                return byEvoLevel(a, b) || byName(a, b);
            }
            sort.byEvoLevelThenName = byEvoLevelThenName;
            function byName(a, b) {
                var an = a.lower || a.name.toLowerCase(), bn = a.lower || b.name.toLowerCase();
                if (an == "sands of time")
                    return -1;
                if (bn == "sands of time")
                    return 1;
                return an == bn ? 0 : an < bn ? -1 : 1;
            }
            sort.byName = byName;
            function byPosition(a, b) {
                var ap = bh.PositionType[a.position], bp = bh.PositionType[b.position];
                return ap == bp ? 0 : ap > bp ? -1 : 1;
            }
            sort.byPosition = byPosition;
            function byPositionThenName(a, b) {
                return byPosition(a, b) || byName(a, b);
            }
            sort.byPositionThenName = byPositionThenName;
            function byRarity(a, b) {
                return a.rarityType == b.rarityType ? 0 : a.rarityType < b.rarityType ? -1 : 1;
            }
            sort.byRarity = byRarity;
            function byRarityThenName(a, b) {
                return byRarity(a, b) || byName(a, b);
            }
            sort.byRarityThenName = byRarityThenName;
            function byRarityThenNameThenEvoLevel(a, b) {
                return byRarity(a, b) || byName(a, b) || byEvoLevel(a, b);
            }
            sort.byRarityThenNameThenEvoLevel = byRarityThenNameThenEvoLevel;
        })(sort = utils.sort || (utils.sort = {}));
    })(utils = bh.utils || (bh.utils = {}));
})(bh || (bh = {}));
var bh;
(function (bh) {
    var utils;
    (function (utils) {
        function htmlFriendly(value) {
            return String(value).replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
        }
        utils.htmlFriendly = htmlFriendly;
        function formatNumber(value) {
            var num = String(value).split(""), out = [], o = 0;
            for (var i = num.length; i--;) {
                if (out.length && o % 3 == 0)
                    out.unshift(",");
                out.unshift(num.pop());
                o++;
            }
            return out.join("");
        }
        utils.formatNumber = formatNumber;
        function round(value, places) {
            var shifter = (10 ^ places), bigger = value * shifter, biggerRounded = Math.round(bigger), rounded = biggerRounded / shifter;
            return rounded;
        }
        utils.round = round;
        function truncateNumber(value) {
            var out = utils.formatNumber(value), parts = out.split(",");
            return parts.length == 1 ? out : parts[0].length == 1 ? parts[0] + "." + parts[1][0] + "k" : parts[0] + "k";
        }
        utils.truncateNumber = truncateNumber;
        function parseBoolean(value) {
            var string = String(value).substring(0, 1).toLowerCase();
            return string === "y" || string === "t" || string === "1";
        }
        utils.parseBoolean = parseBoolean;
        function evoToStars(rarityType, evoLevel) {
            var evo = +evoLevel.split(".")[0], level = +evoLevel.split(".")[1], stars = rarityType + 1, count = 0, value = "";
            while (evo--) {
                count++;
                value += "<span class='evo-star'>&#9733;</span>";
            }
            while (count < stars) {
                count++;
                value += "<span class='star'>&#9734;</span>";
            }
            return value;
        }
        utils.evoToStars = evoToStars;
        function getBase64Image(src) {
            var img = document.createElement("img");
            img.setAttribute('src', src);
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            return dataURL;
        }
        utils.getBase64Image = getBase64Image;
        function createImagesJs() {
            var allTypes = Object.keys(bh.images), loadedTypes = [], imageSources = bh.$("img").toArray().map(function (img) { return img.src; }).reduce(function (arr, src) { return arr.includes(src) ? arr : arr.concat(src); }, []), output = "";
            output += "var bh;(function (bh) {var images;(function (images) {";
            bh.$("#data-output").val("Loading, please wait ...");
            asyncForEach(imageSources, function (imageSource) {
                var parts = imageSource.split("/images/")[1].split(".")[0].split("/");
                if (allTypes.includes(parts[0]) && parts.length == 2) {
                    if (!loadedTypes.includes(parts[0])) {
                        loadedTypes.push(parts[0]);
                        output += "\nimages." + parts[0] + " = {};";
                    }
                    output += "\nimages." + parts[0] + "[\"" + parts[1] + "\"] = \"" + getBase64Image(imageSource) + "\";";
                }
            }).then(function () {
                output += "\n})(images = bh.images || (bh.images = {}));})(bh || (bh = {}));";
                bh.$("#data-output").val(output);
            });
        }
        utils.createImagesJs = createImagesJs;
        function asyncForEach(array, callbackfn, thisArg) {
            return new Promise(function (resolvefn, rejectfn) {
                var functions = array.map(function (value, index, array) {
                    return function (value, index, array) {
                        setTimeout(function (thisArg, value, index, array) {
                            try {
                                var retVal = callbackfn.call(thisArg, value, index, array);
                                retVal instanceof Promise ? retVal.then(process, rejectfn) : process();
                            }
                            catch (ex) {
                                rejectfn(ex);
                            }
                        }, 0, thisArg, value, index, array);
                    }.bind(thisArg, value, index, array);
                });
                var process = function () {
                    if (functions.length) {
                        var fn = functions.shift();
                        fn ? fn() : process();
                    }
                    else {
                        resolvefn(array);
                    }
                };
                process();
            });
        }
        utils.asyncForEach = asyncForEach;
    })(utils = bh.utils || (bh.utils = {}));
})(bh || (bh = {}));
var XmlHttpRequest = (function () {
    function XmlHttpRequest() {
        var _this = this;
        this.responseFilter = null;
        var original = XmlHttpRequest.original || XMLHttpRequest;
        this.xmlHttpRequest = new original();
        XmlHttpRequest.globalListeners.forEach(function (args) {
            try {
                var sliced = args.slice(), fn = sliced[1];
                sliced[1] = function () {
                    var evArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        evArgs[_i] = arguments[_i];
                    }
                    try {
                        fn.apply(_this, evArgs);
                    }
                    catch (e) {
                        console.error("XmlHttpRequest: Firing Global EventListener", e);
                    }
                };
                _this.addEventListener.apply(_this, sliced);
            }
            catch (ex) {
                console.error("XmlHttpRequest: Adding Global EventListeners", ex);
            }
        });
    }
    Object.defineProperty(XmlHttpRequest.prototype, "onabort", {
        get: function () { return this.xmlHttpRequest.onabort; },
        set: function (fn) { this.xmlHttpRequest.onabort = fn; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "onerror", {
        get: function () { return this.xmlHttpRequest.onerror; },
        set: function (fn) { this.xmlHttpRequest.onerror = fn; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "onload", {
        get: function () { return this.xmlHttpRequest.onload; },
        set: function (fn) { this.xmlHttpRequest.onload = fn; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "onloadend", {
        get: function () { return this.xmlHttpRequest.onloadend; },
        set: function (fn) { this.xmlHttpRequest.onloadend = fn; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "onloadstart", {
        get: function () { return this.xmlHttpRequest.onloadstart; },
        set: function (fn) { this.xmlHttpRequest.onloadstart = fn; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "onreadystatechange", {
        get: function () { return this.xmlHttpRequest.onreadystatechange; },
        set: function (fn) { this.xmlHttpRequest.onreadystatechange = fn; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "onprogress", {
        get: function () { return this.xmlHttpRequest.onprogress; },
        set: function (fn) { this.xmlHttpRequest.onprogress = fn; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "ontimeout", {
        get: function () { return this.xmlHttpRequest.ontimeout; },
        set: function (fn) { this.xmlHttpRequest.ontimeout = fn; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "readyState", {
        get: function () { return this.xmlHttpRequest.readyState; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "response", {
        get: function () { return this.xmlHttpRequest.response; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "responseJSON", {
        get: function () {
            if (this.responseType == "json") {
                return this.xmlHttpRequest.response;
            }
            try {
                return JSON.parse(this.responseText);
            }
            catch (ex) {
                console.error("XmlHttpRequest.responseJSON", ex);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "responseText", {
        get: function () {
            var responseType = this.responseType;
            if (responseType == "arraybuffer") {
                var contentType = this.getResponseHeader("Content-Type"), uaConstructor = contentType.match(/UTF\-32/i) ? Uint32Array : contentType.match(/UTF\-16/i) ? Uint16Array : Uint8Array;
                return XmlHttpRequest.arrayBufferToString(this.xmlHttpRequest.response, uaConstructor);
            }
            else if (responseType == "json") {
                return JSON.stringify(this.xmlHttpRequest.response);
            }
            else {
                return this.xmlHttpRequest.responseText;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "responseType", {
        get: function () { return this.xmlHttpRequest.responseType; },
        set: function (type) { this.xmlHttpRequest.responseType = type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "responseXML", {
        get: function () { return this.xmlHttpRequest.responseXML; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "status", {
        get: function () { return this.xmlHttpRequest.status; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "statusText", {
        get: function () { return this.xmlHttpRequest.statusText; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "timeout", {
        get: function () { return this.xmlHttpRequest.timeout; },
        set: function (value) { this.xmlHttpRequest.timeout = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "withCredentials", {
        get: function () { return this.xmlHttpRequest.withCredentials; },
        set: function (value) { this.xmlHttpRequest.withCredentials = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlHttpRequest.prototype, "upload", {
        get: function () { return this.xmlHttpRequest.upload; },
        enumerable: true,
        configurable: true
    });
    XmlHttpRequest.prototype.abort = function () { this.xmlHttpRequest.abort(); };
    XmlHttpRequest.prototype.addEventListener = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.xmlHttpRequest.addEventListener.apply(this.xmlHttpRequest, args);
    };
    XmlHttpRequest.prototype.getAllResponseHeaders = function () { return this.xmlHttpRequest.getAllResponseHeaders(); };
    XmlHttpRequest.prototype.getResponseHeader = function (header) { return this.xmlHttpRequest.getResponseHeader(header); };
    XmlHttpRequest.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.method = args[0] || "";
        this.requestUrl = args[1] || "";
        this.xmlHttpRequest.open.apply(this.xmlHttpRequest, args);
    };
    XmlHttpRequest.prototype.overrideMimeType = function (mime) { this.xmlHttpRequest.overrideMimeType(mime); };
    XmlHttpRequest.prototype.send = function (data) { this.xmlHttpRequest.send(data); };
    XmlHttpRequest.prototype.setRequestHeader = function (header, value) { this.xmlHttpRequest.setRequestHeader(header, value); };
    XmlHttpRequest.addEventListener = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        XmlHttpRequest.globalListeners.push(args);
    };
    XmlHttpRequest.attach = function (win, listener) {
        XmlHttpRequest.original = win.XMLHttpRequest;
        win.XMLHttpRequest = XmlHttpRequest;
        if (listener) {
            XmlHttpRequest.addEventListener("readystatechange", listener);
        }
    };
    XmlHttpRequest.uintArrayToString = function (uintArray) {
        try {
            var CHUNK_SZ = 0x8000, characters = [];
            for (var i = 0, l = uintArray.length; i < l; i += CHUNK_SZ) {
                characters.push(String.fromCharCode.apply(null, uintArray.subarray(i, i + CHUNK_SZ)));
            }
            return decodeURIComponent(escape(characters.join("")));
        }
        catch (ex) {
            console.error("XmlHttpRequest.uintArrayToString", ex);
        }
    };
    XmlHttpRequest.stringToUintArray = function (string, uintArrayConstructor) {
        try {
            var encoded = unescape(encodeURIComponent(string)), charList = encoded.split(''), uintArray = [];
            for (var i = charList.length; i--;) {
                uintArray[i] = charList[i].charCodeAt(0);
            }
            return new uintArrayConstructor(uintArray);
        }
        catch (ex) {
            console.error("XmlHttpRequest.stringToUintArray", ex);
        }
    };
    XmlHttpRequest.arrayBufferToString = function (arrayBuffer, uintArrayConstructor) {
        try {
            if (!uintArrayConstructor) {
                uintArrayConstructor = arrayBuffer instanceof Uint32Array ? Uint32Array : arrayBuffer instanceof Uint16Array ? Uint16Array : Uint8Array;
            }
            var uintArray = new uintArrayConstructor(arrayBuffer);
            return XmlHttpRequest.uintArrayToString(uintArray);
        }
        catch (ex) {
            console.error("XmlHttpRequest.arrayBufferToString", ex);
        }
        return null;
    };
    XmlHttpRequest.get = function (url) {
        return new Promise(function (res, rej) {
            var xhr = new XmlHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState == XmlHttpRequest.DONE) {
                    res(xhr.responseText);
                }
            });
            xhr.open("GET", url, true);
            xhr.send(null);
        });
    };
    XmlHttpRequest.getJSON = function (url) {
        return new Promise(function (res, rej) {
            var xhr = new XmlHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState == XmlHttpRequest.DONE) {
                    res(xhr.responseJSON);
                }
            });
            xhr.open("GET", url, true);
            xhr.send(null);
        });
    };
    XmlHttpRequest.post = function (url, data, contentType) {
        return new Promise(function (res, rej) {
            var xhr = new XmlHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState == XmlHttpRequest.DONE) {
                    res(xhr);
                }
            });
            xhr.open("POST", url, true);
            if (contentType) {
                xhr.setRequestHeader("Content-Type", contentType);
            }
            xhr.send(data);
        });
    };
    XmlHttpRequest.DONE = XMLHttpRequest.DONE;
    XmlHttpRequest.HEADERS_RECEIVED = XMLHttpRequest.HEADERS_RECEIVED;
    XmlHttpRequest.LOADING = XMLHttpRequest.LOADING;
    XmlHttpRequest.OPENED = XMLHttpRequest.OPENED;
    XmlHttpRequest.UNSENT = XMLHttpRequest.UNSENT;
    XmlHttpRequest.globalListeners = [];
    return XmlHttpRequest;
}());
