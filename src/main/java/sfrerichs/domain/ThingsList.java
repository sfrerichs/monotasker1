package sfrerichs.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import sfrerichs.domain.enumeration.Time;

/**
 * A ThingsList.
 */
@Entity
@Table(name = "things_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ThingsList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "list_time")
    private Time listTime;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "thingsList")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Thing> things = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public ThingsList date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Time getListTime() {
        return listTime;
    }

    public ThingsList listTime(Time listTime) {
        this.listTime = listTime;
        return this;
    }

    public void setListTime(Time listTime) {
        this.listTime = listTime;
    }

    public String getDescription() {
        return description;
    }

    public ThingsList description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Thing> getThings() {
        return things;
    }

    public ThingsList things(Set<Thing> things) {
        this.things = things;
        return this;
    }

    public ThingsList addThing(Thing thing) {
        this.things.add(thing);
        thing.setThingsList(this);
        return this;
    }

    public ThingsList removeThing(Thing thing) {
        this.things.remove(thing);
        thing.setThingsList(null);
        return this;
    }

    public void setThings(Set<Thing> things) {
        this.things = things;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ThingsList)) {
            return false;
        }
        return id != null && id.equals(((ThingsList) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ThingsList{" +
            "id=" + id +
            ", date=" + date +
            ", listTime=" + listTime +
            ", description='" + description + '\'' +
            ", things=" + things +
            '}';
    }
}
