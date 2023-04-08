export interface BaseMapper<Entity, ClientEntity, PersistenceEntity> {
  fromEntityToPersistence(entity: Entity): PersistenceEntity;

  fromPersistenceToEntity(persistence: PersistenceEntity): Entity;

  fromEntityToClient(entity: Entity): ClientEntity;
}
