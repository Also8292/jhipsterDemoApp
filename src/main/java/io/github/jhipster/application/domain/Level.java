package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Level.
 */
@Entity
@Table(name = "level")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Level implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "years")
    private Integer years;

    @ManyToOne
    @JsonIgnoreProperties("levels")
    private Students students_level;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Level name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getYears() {
        return years;
    }

    public Level years(Integer years) {
        this.years = years;
        return this;
    }

    public void setYears(Integer years) {
        this.years = years;
    }

    public Students getStudents_level() {
        return students_level;
    }

    public Level students_level(Students students) {
        this.students_level = students;
        return this;
    }

    public void setStudents_level(Students students) {
        this.students_level = students;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Level level = (Level) o;
        if (level.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), level.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Level{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", years=" + getYears() +
            "}";
    }
}
