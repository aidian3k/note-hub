package project.ee.notehub.infrastructure.mapper;

public interface GenericMapper<MODEL, DTO> {
	DTO toDto(MODEL model);
	MODEL toModel(DTO dto);
}
