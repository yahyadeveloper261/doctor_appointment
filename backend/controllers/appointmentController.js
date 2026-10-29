import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

const getAppointments = async (req, res) => {
  try {
    const { search, filter, page, limit } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query = {
      patient: req.user.userId,
    };

    if (filter !== "all") {
      query.status = filter;
    }

    let appointments = await Appointment.find(query).populate("doctor");

    if (search) {
      appointments = appointments.filter((appointment) =>
        appointment.doctor?.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    appointments.sort((a, b) => {
      if (a.status === "cancelled" && b.status !== "cancelled") return 1;
      if (a.status !== "cancelled" && b.status === "cancelled") return -1;

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const counts = {
      all: await Appointment.countDocuments({
        patient: req.user.userId,
      }),

      pending: await Appointment.countDocuments({
        patient: req.user.userId,
        status: "pending",
      }),

      confirmed: await Appointment.countDocuments({
        patient: req.user.userId,
        status: "confirmed",
      }),

      completed: await Appointment.countDocuments({
        patient: req.user.userId,
        status: "completed",
      }),

      cancelled: await Appointment.countDocuments({
        patient: req.user.userId,
        status: "cancelled",
      }),
    };

    const total = appointments.length;
    const totalPages = Math.ceil(total / limit);

    appointments = appointments.slice(skip, skip + Number(limit));

    if (appointments.length === 0) {
      return res.status(200).json({
        success: true,
        appointments: [],
        total,
        totalPages,
      });
    }

    res.status(200).json({
      success: true,
      appointments,
      total,
      totalPages,
      counts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
    });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 7, sort = "default" } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    let appointments = await Appointment.find({
      doctor: req.doctor.doctorId,
    }).populate("patient", "name");

    if (search) {
      appointments = appointments.filter((appointment) =>
        appointment.patient?.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    const sortingAppointments =
      sort === "default"
        ? appointments
        : sort === "newest"
          ? [...appointments].sort(
              (a, b) => new Date(b.date) - new Date(a.date),
            )
          : [...appointments].sort(
              (a, b) => new Date(a.date) - new Date(b.date),
            );

    const total = appointments.length;
    const totalPages = Math.max(1, Math.ceil(total / Number(limit)));

    appointments = sortingAppointments.slice(skip, skip + Number(limit));
    if (appointments.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No appointments found",
      });
    }

    res.status(200).json({
      success: true,
      appointments,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
    });
  }
};


const createAppointment = async (req, res) => {
  try {
    const { doctor, name, reason, date, time } = req.body;

    if (
      !doctor?.trim() ||
      !name?.trim() ||
      !reason?.trim() ||
      !time?.trim() ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const doctorExists = await Doctor.findById(doctor);

    if (!doctorExists) {
      return res.status(404).json({
        success: false,
        message: "Doctor Not Exist",
      });
    }

    // Check if this doctor and time slot is already booked
    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
      status: { $ne: "cancelled" },
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked. Please select another time.",
      });
    }

    // Create appointment if slot is available
    const appointment = await Appointment.create({
      patient: req.user.userId,
      doctor,
      name,
      reason,
      time,
      date,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment Booked Successfully",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to book appointment",
    });
  }
};



const getBookedSlots = async (req, res) => {
  try {
    const { doctor, date } = req.query;

    if (!doctor || !date) {
      return res.status(400).json({
        success: false,
        message: "Doctor and date are required",
      });
    }

    const appointments = await Appointment.find({
      doctor,
      date,
      status: { $ne: "cancelled" },
    }).select("time -_id");

    const bookedSlots = appointments.map(
      (appointment) => appointment.time
    );

    return res.status(200).json({
      success: true,
      bookedSlots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get booked slots",
    });
  }
};




const updateAppointment = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        doctor: req.doctor.doctorId,
      },
      { status },
      { new: true, runValidators: true },
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update appointment",
    });
  }
};

const getSingleAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment does not exist",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointment",
    });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialty");
    if (appointments.length === 0) {
      return res.status(400).json({ message: "No appointment are available" });
    }
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "failed to load appointments" });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        patient: req.user.userId,
        status: "pending",
      },

      { status: "cancelled" },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment does not exist",
      });
    }

    res.status(200).json({
      success: true,

      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel appointment",
    });
  }
};

export {
  createAppointment,
  getAppointments,
  getSingleAppointment,
  updateAppointment,
  getDoctorAppointments,
  cancelAppointment,
  getAllAppointments,
  getBookedSlots
};
