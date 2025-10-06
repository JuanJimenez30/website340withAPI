package com.example.demo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity // relates a class to a database table
@Table(name = "Weird Animals") // do not need to name table
public class weird_Animals {
	// Attributes of the animal
	@Id // Primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Auto incrementing value
	private Long animalId;

	@Column(nullable = false) // Name of the animal, cannot be null
	private String name;
	private String description;
	private String habitat;
	private String species;

	public weird_Animals() {
		// Default constructor
	}

	public weird_Animals(Long animalId, String name, String description, String habitat, String species) {
		this.animalId = animalId;
		this.name = name;
		this.description = description;
		this.habitat = habitat;
		this.species = species;
	}

	// Constructor for animal without ID
	public weird_Animals(String name, String description, String habitat, String species) {
		this.name = name;
		this.description = description;
		this.habitat = habitat;
		this.species = species;
	}

	public Long getAnimalId() {
		return animalId;
	}

	public void setAnimalId(Long id) {
		this.animalId = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getHabitat() {
		return habitat;
	}

	public void setHabitat(String habitat) {
		this.habitat = habitat;
	}

	public String getSpecies() {
		return species;
	}

	public void setSpecies(String species) {
		this.species = species;
	}
}

