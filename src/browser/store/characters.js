import { align, limit } from '../utilities/entity';
import backend from '../backend';
import listStore from './listStore';

export default {
  ...listStore('characters'),
  actions: {
    async createCharacter(context, { name, initiative, attributes }) {
      await backend.createCharacter({
        x: 0.5,
        y: 0.5,
        z: Date.now(),
        name,
        initiative,
        attributes,
      });
    },
    async updateCharacter(context, { id, key, value }) {
      await backend.updateCharacter(id, key, value);
    },
    async updateCharacterIcon(context, { id, file }) {
      await backend.updateCharacterIcon(id, file);
    },
    async updateCharacterPortrait(context, { id, key, file }) {
      await backend.updateCharacterPortrait(id, key, file);
    },
    async clearCharacterIcon(context, id) {
      await backend.clearCharacterIcon(id);
    },
    async clearCharacterPortrait(context, { id, key }) {
      await backend.clearCharacterPortrait(id, key);
    },
    async removeCharacter(context, id) {
      await backend.removeCharacter(id);
    },
    async alignCharacter({ state }, id) {
      const characters = state.characters.find(s => s.id === id);
      if (!characters) return;

      const { x, y } = characters;
      await backend.moveCharacter(
        id,
        align(x),
        align(y),
        Date.now(),
      );
    },
    async moveCharacter({ state }, { id, x, y }) {
      const { width, height } = state.map;
      await backend.moveCharacter(id, limit(x, width), limit(y, height), Date.now());
    },
  },
};
