/// <reference path="Repo.ts"/>
namespace bh {
	export class BattleCardRepo extends Repo<IDataBattleCard> {
		constructor() {
			super(1134947346, false);
		}

		public static AddedPerkPerEvo = 20;
		public static isCycleCard(card: IDataBattleCard, evo = card.rarityType + 1) {
			if (card.turns != 1) return false;
			if (card.effects.find(e => e == "Haste 1T")) return true;
			if (card.perks.find(p => p == "Haste 1T") && BattleCardRepo.getPerk(card, evo) == 100) return true;
			return false;
		}
		public static getPerk(card: IDataBattleCard, evo: number) {
			return Math.min(100, card.perkBase + BattleCardRepo.AddedPerkPerEvo * evo);
		}
		public static getMaxPerk(card: IDataBattleCard) {
			return BattleCardRepo.getPerk(card, 1 + card.rarityType);
		}
		public static calculateValue(playerCard: IPlayer.PlayerCard, typeIndex = 0): number {
			var card = data.BattleCardRepo.find(playerCard.configId);
			if (!card) return 0;
			var min = card.minValues[typeIndex][playerCard.evolutionLevel],
				deltaMin = card.minValues[typeIndex].slice().pop(),
				deltaMax = card.maxValues[typeIndex],
				delta = (deltaMax - deltaMin) / (bh.BattleCardRepo.getLevelsForRarity(card.rarityType) - 1);
			return Math.floor(min + delta * playerCard.level);
		}
		public static getLevelsForRarity(rarityType: RarityType) {
			return [10,20,35,50,50][rarityType];
		}
		public static isMaxLevel(rarity: GameRarity, level: number): boolean {
			return level == BattleCardRepo.getLevelsForRarity(RarityType[<GameRarity>(rarity||"").replace(/ /, "")]);
		}
		public static getXpDeltaFromLevel(level: number) {
			return level ? (level - 1) * 36 + 100 : 0;
		}
		public static getXpForLevel(level: number) {
			var xp = 0;
			for (var i = 1; i < level; i++) xp += BattleCardRepo.getXpDeltaFromLevel(i);
			return xp;
		}
		public static getXpValue(card: IDataBoosterCard) {
			switch (card.rarityType) {
				case RarityType.Common: return 400;
				case RarityType.Uncommon: return 700;
				case RarityType.Rare: return 1200;
				case RarityType.SuperRare: return 0;
				case RarityType.Legendary: return 0;
				default: return 0;
			}
		}
	}
}